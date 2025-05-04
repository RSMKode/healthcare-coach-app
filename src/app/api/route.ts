export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const { page = 1, pageSize = 20, query } = options;
    
      // delay(1000);
    
      const patients = await prisma.patient.findMany({
        orderBy: [{ name: 'desc' }],
      });
      if (!patients.length) throw new NotFoundError('No patients found');
    
      // Text fields created by Prisma Client in SQLite databases do not support case-insensitive filtering.
      const filteredPatients = query
        ? patients.filter(patient => {
            normalizeString(patient.name).includes(normalizeString(query));
          })
        : patients;
    
      const paginatedPatients = getPaginatedResults(filteredPatients, {
        page,
        pageSize,
      });
      return paginatedPatients;
}
