Ee la raiz del proyecto

```bash
cd backend/ValorizaParkAPI
```

Actualizamos dependencias

```bash
dotnet restore ValorizaParkAPI.csproj
```

Arrancamos aplicacion

```bash
ASPNETCORE_URLS="http://localhost:5051" ASPNETCORE_ENVIRONMENT="Development" dotnet run ValorizaParkAPI.csproj
```
