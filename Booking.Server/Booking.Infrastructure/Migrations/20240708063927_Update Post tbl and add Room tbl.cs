using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePosttblandaddRoomtbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuildingNumber",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "NumberOfRooms",
                table: "Posts",
                newName: "NumberOfGuests");

            migrationBuilder.AddColumn<int>(
                name: "Discount",
                table: "Posts",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Rate",
                table: "Posts",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "ZipCode",
                table: "Posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    HotelId = table.Column<Guid>(type: "uuid", nullable: false),
                    NumberOfGuests = table.Column<int>(type: "integer", nullable: true),
                    NumberOfRooms = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rooms_Posts_HotelId",
                        column: x => x.HotelId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_HotelId",
                table: "Rooms",
                column: "HotelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Rate",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "NumberOfGuests",
                table: "Posts",
                newName: "NumberOfRooms");

            migrationBuilder.AddColumn<string>(
                name: "BuildingNumber",
                table: "Posts",
                type: "text",
                nullable: true);
        }
    }
}
