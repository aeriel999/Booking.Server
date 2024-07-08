using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddTablesPostTypeOfRestAndPostPostTypeOfRest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PostTypesOfRest",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostTypesOfRest", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PostPostTypesOfRest",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PostTypeOfRestId = table.Column<Guid>(type: "uuid", nullable: false),
                    PostId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostPostTypesOfRest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostPostTypesOfRest_PostTypesOfRest_PostTypeOfRestId",
                        column: x => x.PostTypeOfRestId,
                        principalTable: "PostTypesOfRest",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PostPostTypesOfRest_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostPostTypesOfRest_PostId",
                table: "PostPostTypesOfRest",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostPostTypesOfRest_PostTypeOfRestId",
                table: "PostPostTypesOfRest",
                column: "PostTypeOfRestId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostPostTypesOfRest");

            migrationBuilder.DropTable(
                name: "PostTypesOfRest");
        }
    }
}
