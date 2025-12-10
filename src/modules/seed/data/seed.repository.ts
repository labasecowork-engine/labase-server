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

    return { message: "Database seeded successfully for development" };
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
    const employeeOne = employees[0].employee_id;
    const employeeTwo = employees[1].employee_id;
    const employeeThree = employees[2].employee_id;
    const employeeFour = employees[3].employee_id;
    const employeeFive = employees[4].employee_id;

    for (const chatMessageData of fakeChatMessages) {
      await prisma.chat_messages.create({
        data: {
          ...chatMessageData,
          user_id:
            chatMessageData.user_id === "carlos_87"
              ? employeeOne
              : chatMessageData.user_id === "laura_mz"
              ? employeeTwo
              : chatMessageData.user_id === "diego_r"
              ? employeeThree
              : chatMessageData.user_id === "sofia_v"
              ? employeeFour
              : chatMessageData.user_id === "andrea_k"
              ? employeeFive
              : employeeOne,
        },
      });
    }

    console.log("Mensajes de chat falsos creados");
  }
}
