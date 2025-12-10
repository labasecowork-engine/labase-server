
    /**
     * @openapi
     * /api/v1/calendar:
     *   get:
     *     tags:
     *       - Calendar
     *     summary: Obtener eventos del calendario semanal
     *     description: Devuelve una lista de reservas formateadas por día y horario para uso en el calendario visual.
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de eventos
     */