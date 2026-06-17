import prisma from "../../../config/prisma_client";
import {
  access_type,
  article_status,
  attendance_type,
  duration_unit,
  price_mode,
  space_type,
  unit_of_measure,
  reminder_frequency,
} from "@prisma/client";
import {
  employeesData,
  pricesData,
  spacesWithImages,
  workAreasData,
  fakeClientsData,
  fakeReservationsData,
  categoriesArticles,
  articlesData,
  fakeVisitorsData,
  brandList,
  productList,
  fakeRemindersData,
  fakeChatMessages,
} from "../constants";
import {
  getWorkDays,
  generateAttendanceStats,
  printAttendanceStats,
  AttendanceRecord,
} from "../utils";

export class SeedRepository {
  async seedProduction() {
    await this.createAdminUser();
    await this.createSpacesAndPrices();
    await this.createNewsletters();
    await this.createEmployeesWithAssignments();
    await this.createCategoriesArticles();
    await this.createArticles();
    await this.createLockers();
    await this.createParkingSpaces();
    // TODO: Crear semilla a partir del excel de visitantes

    return { message: "Database seeded successfully for production" };
  }

  async seedDevelopment() {
    await this.createAdminUser();
    await this.createClientUser();
    await this.createSpacesAndPrices();
    await this.createNewsletters();
    await this.createEmployeesWithAssignments();
    await this.createCategoriesArticles();
    await this.createArticles();
    await this.createFakeClientsAndReservations();
    await this.createFakeVisitors();
    await this.createAttendanceRecords();
    const brands = await this.createFakeBrands();
    await this.createFakeProducts(brands);
    await this.createRemindersFake();
    await this.createFakeChatMessages();
    await this.createLockers();
    await this.createLockerSamples();
    await this.createParkingSpaces();
    await this.createParkingSamples();
    await this.createClientAttendanceSamples();

    return { message: "Database seeded successfully for development" };
  }

  // Los 49 lockers físicos del coworking. Algunos marcados como VIP.
  async createLockers() {
    const VIP_NUMBERS = new Set([5, 12, 20, 33, 42]);
    await prisma.locker.createMany({
      data: Array.from({ length: 49 }, (_, index) => ({
        number: index + 1,
        is_vip: VIP_NUMBERS.has(index + 1),
      })),
      skipDuplicates: true,
    });
    console.log("Lockers creados (49)");
  }

  // Los 5 espacios de estacionamiento (E1…E5).
  async createParkingSpaces() {
    await prisma.parking_space.createMany({
      data: Array.from({ length: 5 }, (_, index) => ({
        code: `E${index + 1}`,
      })),
      skipDuplicates: true,
    });
    console.log("Espacios de parking creados (5)");
  }

  // Registros de ejemplo de estacionamiento (con salida) + uno activo (ocupado).
  async createParkingSamples() {
    const spaces = await prisma.parking_space.findMany({
      select: { id: true, code: true },
    });
    const byCode = new Map(spaces.map((s) => [s.code, s.id]));
    const at = (d: string, t: string) => new Date(`${d}T${t}:00`);

    const samples = [
      { code: "E5", client: "Cristhiam Paolo Villavicencio Lizbarraga", company: "ALICORP S.A.A", plate: "—", date: "2026-05-22", in: "13:14", out: "18:28" },
      { code: "E2", client: "Olivares Luna Jose Diego", company: "ENAZUL S.A.C.", plate: "X2Z-839", date: "2026-05-25", in: "09:07", out: "14:21" },
      { code: "E3", client: "Durand Cornejo Jose Jhonathan Sabino", company: "CONTASISCORP S.A.C.", plate: "W4Y-526", date: "2026-05-25", in: "09:08", out: "14:21" },
      { code: "E1", client: "Ataypoma Crispin Wilfredo Pariz", company: "PERSONA NATURAL", plate: "BZN-085", date: "2026-05-30", in: "13:11", out: "16:24" },
    ];

    for (const s of samples) {
      const space_id = byCode.get(s.code);
      if (!space_id) continue;
      const entry = at(s.date, s.in);
      const exit = at(s.date, s.out);
      const total = Math.max(
        0,
        Math.round((exit.getTime() - entry.getTime()) / 60000)
      );
      await prisma.parking_record.create({
        data: {
          space_id,
          client_name: s.client,
          company: s.company,
          plate: s.plate,
          date: new Date(s.date),
          entry_time_1: entry,
          exit_time_1: exit,
          total_minutes: total,
          status: "exited",
        },
      });
    }

    // Un vehículo actualmente dentro (E4 ocupado), hoy.
    const e4 = byCode.get("E4");
    if (e4) {
      const todayStr = new Date().toISOString().slice(0, 10);
      await prisma.parking_record.create({
        data: {
          space_id: e4,
          client_name: "Olivares Luna Jose Diego",
          company: "ENAZUL S.A.C.",
          plate: "X2Z-839",
          date: new Date(todayStr),
          entry_time_1: at(todayStr, "08:30"),
          status: "active",
        },
      });
    }
    console.log("Registros de parking de ejemplo creados");
  }

  // Registros de ejemplo de asistencia de clientes (2 presentes hoy + salidos).
  async createClientAttendanceSamples() {
    const at = (d: string, t: string) => new Date(`${d}T${t}:00`);
    const p2 = (n: number) => String(n).padStart(2, "0");
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${p2(now.getMonth() + 1)}-${p2(now.getDate())}`;

    const presents = [
      { name: "Edith Muñoz Lujan", company: "ENAZUL S.A.C." },
      { name: "Fiorela Lizbeth Herrera Salome", company: "ENAZUL S.A.C." },
    ];
    for (const person of presents) {
      await prisma.client_attendance.create({
        data: {
          client_name: person.name,
          company: person.company,
          date: new Date(todayStr),
          entry_time_1: at(todayStr, "15:01"),
          limit_time: at(todayStr, "19:00"),
          status: "present",
          source: "contract",
        },
      });
    }

    const exits = [
      { name: "Fidel Meza Taipe", company: "Constasiscorp", date: "2026-06-15", in: "10:10", out: "14:31" },
      { name: "Olivares Luna Jose Diego", company: "ALICORP S.A.A", date: "2026-06-09", in: "12:01", out: "14:56" },
      { name: "Ataypoma Crispin Wilfredo Pariz", company: "ALICORP S.A.A", date: "2026-06-09", in: "10:46", out: "14:56" },
    ];
    for (const e of exits) {
      const entry = at(e.date, e.in);
      const exit = at(e.date, e.out);
      const total = Math.max(
        0,
        Math.round((exit.getTime() - entry.getTime()) / 60000)
      );
      await prisma.client_attendance.create({
        data: {
          client_name: e.name,
          company: e.company,
          date: new Date(e.date),
          entry_time_1: entry,
          exit_time_1: exit,
          total_minutes: total,
          status: "exited",
          source: "contract",
        },
      });
    }
    console.log("Registros de asistencia de clientes de ejemplo creados");
  }

  // Datos de ejemplo para ver el módulo con contenido: entregas activas y
  // reservas con locker asignado.
  async createLockerSamples() {
    const sampleDeliveries = [
      {
        number: 42,
        person_name: "Rafael Martín Aguirre Gonzalo",
        company: "FINACORP",
        type: "vip" as const,
      },
      {
        number: 13,
        person_name: "Michael Cristian Chamorro Vargas",
        company: "ENAZUL S.A.C.",
        type: "normal" as const,
      },
    ];

    for (const sample of sampleDeliveries) {
      const locker = await prisma.locker.findUnique({
        where: { number: sample.number },
        select: { id: true },
      });
      if (!locker) continue;
      await prisma.locker_delivery.create({
        data: {
          locker_id: locker.id,
          person_name: sample.person_name,
          company: sample.company,
          type: sample.type,
        },
      });
    }

    // Asigna un locker fijo a las primeras reservas (pestaña "Por reserva").
    const reservations = await prisma.reservation.findMany({
      take: 2,
      select: { id: true },
    });
    const assignableLockers = await prisma.locker.findMany({
      where: { number: { in: [7, 9] } },
      select: { id: true },
    });
    for (let i = 0; i < reservations.length && i < assignableLockers.length; i++) {
      await prisma.reservation.update({
        where: { id: reservations[i].id },
        data: { locker_id: assignableLockers[i].id },
      });
    }
    console.log("Datos de ejemplo de lockers creados");
  }

  async createAdminUser() {
    await prisma.users.create({
      data: {
        id: "22222222-2222-2222-2222-222222222222",
        first_name: "Ana",
        last_name: "Gonzales",
        email: "admin@labase.com",
        password:
          "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
        user_type: "admin",
        status: "active",
        creation_timestamp: new Date(),
      },
    });
    console.log("Usuario administrador creado");

    await prisma.admin_details.create({
      data: {
        admin_id: "22222222-2222-2222-2222-222222222222",
        role: "superadmin",
        notes: "Admin inicial del sistema",
      },
    });
    console.log("Detalles del administrador creado");
  }

  async createClientUser() {
    await prisma.users.create({
      data: {
        id: "33333333-3333-3333-3333-333333333333",
        first_name: "Máximo",
        last_name: "Silveria",
        email: "labase.developers@gmail.com",
        password:
          "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
        user_type: "client",
        status: "active",
        creation_timestamp: new Date(),
      },
    });

    await prisma.user_details.create({
      data: {
        user_id: "33333333-3333-3333-3333-333333333333",
        status: "active",
      },
    });

    console.log("Usuario cliente creado");
  }

  async createSpacesAndPrices() {
    for (const spaceData of spacesWithImages) {
      await prisma.$transaction(async (tx) => {
        const space = await tx.space.create({
          data: {
            ...spaceData.space,
            type: spaceData.space.type as space_type,
            access: spaceData.space.access as access_type,
          },
        });

        if (spaceData.images && spaceData.images.length > 0) {
          await tx.space_image.createMany({
            data: spaceData.images.map((img) => ({
              space_id: space.id,
              url: img.url,
              alt: img.alt,
              position: img.position,
            })),
          });
        }
      });
    }
    console.log("Espacios y imagenes de los espacios creados");

    for (const priceData of pricesData) {
      await prisma.price.create({
        data: {
          id: priceData.id,
          space_id: priceData.space_id,
          duration: priceData.duration as duration_unit,
          mode: priceData.mode as price_mode,
          amount: priceData.amount,
        },
      });
    }
    console.log("Precios de los espacios creados");
  }

  async createNewsletters() {
    for (const emp of employeesData) {
      await prisma.newsletter_subscriber.create({
        data: {
          name: emp.name,
          email: emp.email,
          created_at: new Date(),
        },
      });
    }
    console.log("Newsletters creados");
  }

  async createEmployeesWithAssignments() {
    const company = await prisma.companies.create({
      data: {
        name: "La base",
        description: "Empresa de prueba para practicantes y áreas",
      },
    });

    console.log("Empresa creada:", company);

    const workAreas = await prisma.$transaction(
      workAreasData.map((wa) => prisma.work_areas.create({ data: wa }))
    );

    console.log(
      "Áreas de trabajo creadas:",
      workAreas.map((w) => w.name)
    );

    const workAreaMap = Object.fromEntries(
      workAreas.map((w) => [w.name, w.id])
    );

    for (const emp of employeesData) {
      const [lastName, ...rest] = emp.name.split(" ");
      const firstName = rest.join(" ");

      await prisma.$transaction(async (tx) => {
        const user = await tx.users.create({
          data: {
            first_name: firstName,
            last_name: lastName,
            email: emp.email,
            password:
              "$2b$12$X00fWdC0IAfuIafie7ONleA.Uu.4JvUCe0vFaUeC66t.jeETRLNL2",
            user_type: "employee",
            status: "active",
          },
        });

        await tx.employee_details.create({
          data: {
            employee_id: user.id,
            work_area_id: workAreaMap[emp.area],
            company_id: company.id,
          },
        });

        console.log(`Empleado creado: ${firstName} ${lastName} (${emp.email})`);
      });
    }

    console.log("Empleados creados");
  }

  async createCategoriesArticles() {
    for (const category of categoriesArticles) {
      await prisma.article_categories.create({
        data: {
          id: category.id,
          name: category.name,
          description: category.description,
        },
      });
    }
    console.log("Categorías de artículos creadas");
  }

  async createArticles() {
    for (const article of articlesData) {
      await prisma.articles.create({
        data: {
          ...article,
          status: article.status as article_status,
        },
      });
    }
    console.log("Artículos creados");
  }

  async createFakeClientsAndReservations() {
    // Crear clientes falsos
    for (const clientData of fakeClientsData) {
      await prisma.users.create({
        data: {
          ...clientData,
          user_type: clientData.user_type as "client",
          status: clientData.status as "active",
          gender: clientData.gender as "male" | "female" | "unspecified",
          creation_timestamp: new Date(),
        },
      });

      await prisma.user_details.create({
        data: {
          user_id: clientData.id,
          status: clientData.status as "active",
        },
      });
    }
    console.log("Clientes falsos creados");

    // Crear reservas falsas
    for (const reservationData of fakeReservationsData) {
      await prisma.reservation.create({
        data: {
          ...reservationData,
          status: reservationData.status as "confirmed",
          created_at: new Date(),
        },
      });
    }
    console.log("Reservas falsas creadas");
  }

  async createFakeVisitors() {
    for (const visitorData of fakeVisitorsData) {
      await prisma.visitors.create({
        data: {
          dni: visitorData.dni || null,
          ruc: visitorData.ruc || null,
          first_name: visitorData.first_name,
          last_name: visitorData.last_name,
          phone: visitorData.phone,
          email: visitorData.email,
          user_id: visitorData.user_id,
          space_id: visitorData.space_id,
          entry_time: visitorData.entry_time,
          exit_time: visitorData.exit_time,
          created_at: new Date(),
        },
      });
    }
    console.log("Visitantes falsos creados");
  }

  async createFakeBrands(): Promise<
    { id: string; name: string; created_at: Date }[]
  > {
    const createdBrands = await Promise.all(
      brandList.map(async (brandData) => {
        const brand = await prisma.product_brand.upsert({
          where: { name: brandData.name },
          update: {},
          create: brandData,
        });

        console.log(`Marca procesada: ${brand.name}`);
        return brand;
      })
    );

    console.log(`Total marcas procesadas: ${createdBrands.length}`);
    return createdBrands;
  }

  async createFakeProducts(
    brands: { id: string; name: string }[]
  ): Promise<any[]> {
    const brandMap = new Map(brands.map((brand) => [brand.name, brand.id]));

    const createdProducts: any[] = [];

    for (const productData of productList) {
      const brandId = brandMap.get(productData.brand_name);

      if (!brandId) {
        console.warn(
          `Marca no encontrada: ${productData.brand_name} para producto: ${productData.name}`
        );
        continue;
      }

      const { brand_name, ...productWithoutBrandName } = productData;

      const product = await prisma.products.create({
        data: {
          ...productWithoutBrandName,
          brand_id: brandId,
          unit_of_measure: productData.unit_of_measure as unit_of_measure,
        },
        include: {
          brand: { select: { id: true, name: true } },
        },
      });

      createdProducts.push(product);
      console.log(
        `Producto creado: ${product.name} - ${product.brand.name} (Cantidad: ${product.quantity})`
      );
    }

    console.log(`Total productos creados: ${createdProducts.length}`);
    return createdProducts;
  }

  async createRemindersFake(): Promise<void> {
    for (const reminderData of fakeRemindersData) {
      await prisma.reminders.create({
        data: {
          name: reminderData.name,
          phone_number: reminderData.phone_number,
          message: reminderData.message,
          send_date: reminderData.send_date,
          frequency: reminderData.frequency as reminder_frequency,
          is_active: reminderData.is_active,
        },
      });
    }
    console.log("Recordatorios falsos creados");
  }

  async createAttendanceRecords(): Promise<void> {
    const TARGET_RECORDS = 300;

    const fetchEmployees = async () => {
      return await prisma.employee_details.findMany({
        select: { employee_id: true },
      });
    };

    const insertAttendanceRecords = async (records: AttendanceRecord[]) => {
      await prisma.attendance.createMany({
        data: records,
      });
    };

    try {
      const employees = await fetchEmployees();
      const workDays = getWorkDays(90, 60);

      if (employees.length === 0) {
        console.log("No hay empleados.");
        return;
      }

      const totalCombinations = employees.length * workDays.length;
      const maxPossibleRecords = totalCombinations * 4;
      if (TARGET_RECORDS > maxPossibleRecords) {
        console.error(`Objetivo inalcanzable de ${TARGET_RECORDS} registros.`);
        console.error(
          `Con ${employees.length} empleados y ${workDays.length} días, el máximo es ~${maxPossibleRecords}.`
        );
        return;
      }

      const allRecords: AttendanceRecord[] = [];
      const processedEmployeeDays = new Set<string>();

      while (allRecords.length < TARGET_RECORDS) {
        const employee =
          employees[Math.floor(Math.random() * employees.length)];
        const day = new Date(
          workDays[Math.floor(Math.random() * workDays.length)].setHours(
            0,
            0,
            0,
            0
          )
        );

        const uniqueKey = `${employee.employee_id}_${day.toDateString()}`;

        if (processedEmployeeDays.has(uniqueKey)) {
          continue;
        }
        processedEmployeeDays.add(uniqueKey);

        const dailyRecords: AttendanceRecord[] = [];
        const isSplitShift = Math.random() < 0.3;

        const firstentryTime = new Date(day);
        const entryHour = 8 + Math.random();
        firstentryTime.setHours(
          Math.floor(entryHour),
          Math.floor(Math.random() * 60)
        );

        dailyRecords.push({
          employee_id: employee.employee_id,
          type: attendance_type.entry,
          date: day,
          check_time: firstentryTime,
        });

        let lastCheckTime = firstentryTime;

        if (isSplitShift) {
          const firstexitTime = new Date(lastCheckTime);
          const firstWorkHours = 3 + Math.random() * 2;
          firstexitTime.setHours(firstexitTime.getHours() + firstWorkHours);
          dailyRecords.push({
            employee_id: employee.employee_id,
            type: attendance_type.exit,
            date: day,
            check_time: firstexitTime,
          });
          lastCheckTime = firstexitTime;

          const secondentryTime = new Date(lastCheckTime);
          const breakHours = 1 + Math.random();
          secondentryTime.setHours(secondentryTime.getHours() + breakHours);
          dailyRecords.push({
            employee_id: employee.employee_id,
            type: attendance_type.entry,
            date: day,
            check_time: secondentryTime,
          });
          lastCheckTime = secondentryTime;

          const secondexitTime = new Date(lastCheckTime);
          const secondWorkHours = 4 + Math.random() * 2;
          secondexitTime.setHours(secondexitTime.getHours() + secondWorkHours);
          dailyRecords.push({
            employee_id: employee.employee_id,
            type: attendance_type.exit,
            date: day,
            check_time: secondexitTime,
          });
        } else {
          const exitTime = new Date(lastCheckTime);
          const workHours = 8 + Math.random() * 2;
          exitTime.setHours(exitTime.getHours() + workHours);

          dailyRecords.push({
            employee_id: employee.employee_id,
            type: attendance_type.exit,
            date: day,
            check_time: exitTime,
          });
        }

        if (allRecords.length + dailyRecords.length <= TARGET_RECORDS) {
          allRecords.push(...dailyRecords);
        } else {
          break;
        }
      }

      await insertAttendanceRecords(allRecords);

      console.log(
        `\nProceso completado. Se generaron ${allRecords.length} registros lógicos.`
      );
      printAttendanceStats(generateAttendanceStats(allRecords));
    } catch (error) {
      console.error("Error al crear registros de asistencia:", error);
      throw error;
    }
  }

  async createFakeChatMessages(): Promise<void> {
    const employees = await prisma.employee_details.findMany({
      select: { employee_id: true },
    });
    if (employees.length === 0) {
      console.warn("No hay empleados para crear mensajes de chat falsos");
      return;
    }

    const employeeIds = employees.map((employee) => employee.employee_id);
    const chatAliases = [
      "carlos_87",
      "laura_mz",
      "diego_r",
      "sofia_v",
      "andrea_k",
    ];
    const aliasToEmployeeId = Object.fromEntries(
      chatAliases.map((alias, index) => [
        alias,
        employeeIds[index % employeeIds.length],
      ])
    );

    for (const chatMessageData of fakeChatMessages) {
      await prisma.chat_messages.create({
        data: {
          ...chatMessageData,
          user_id:
            aliasToEmployeeId[
              chatMessageData.user_id as keyof typeof aliasToEmployeeId
            ] ?? employeeIds[0],
        },
      });
    }

    console.log("Mensajes de chat falsos creados");
  }
}
