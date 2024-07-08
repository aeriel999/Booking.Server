using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DeleteTypeOfRent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_PostTypeOfRent_PostTypeOfRentId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "PostTypeOfRent");

            migrationBuilder.DropIndex(
                name: "IX_Posts_PostTypeOfRentId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "PostTypeOfRentId",
                table: "Posts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PostTypeOfRentId",
                table: "Posts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "PostTypeOfRent",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostTypeOfRent", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_PostTypeOfRentId",
                table: "Posts",
                column: "PostTypeOfRentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_PostTypeOfRent_PostTypeOfRentId",
                table: "Posts",
                column: "PostTypeOfRentId",
                principalTable: "PostTypeOfRent",
                principalColumn: "Id");
        }
    }
}
