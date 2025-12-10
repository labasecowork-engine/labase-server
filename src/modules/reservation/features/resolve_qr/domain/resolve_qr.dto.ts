import { z } from "zod";

import { ResolveQrSchema } from "./resolve_qr.schema";
export type ResolveQrDTO = z.infer<typeof ResolveQrSchema>;
