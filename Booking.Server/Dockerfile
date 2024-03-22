# Learn about building .NET container images:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /source

# copy csproj and restore as distinct layers
WORKDIR /app

WORKDIR /src

COPY ["Booking.Server/Booking.Domain/Booking.Domain.csproj", "Booking.Domain/"]
COPY ["Booking.Server/Booking.Application/Booking.Application.csproj", "Booking.Application/"]
COPY ["Booking.Server/Booking.Infrastructure/Booking.Infrastructure.csproj", "Booking.Infrastructure/"]
COPY ["Booking.Server/Booking.Api/Booking.Api.csproj", "Booking.Api/"]
RUN dotnet restore "Booking.Api/Booking.Api.csproj"

# copy everything else and build app
COPY . .
WORKDIR /src/Booking.Server/Booking.Api/
RUN dotnet build "Booking.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Booking.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Booking.Api.dll"]
