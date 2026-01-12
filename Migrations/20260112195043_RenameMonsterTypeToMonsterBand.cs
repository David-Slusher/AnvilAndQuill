using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnvilAndQuill.Migrations
{
    /// <inheritdoc />
    public partial class RenameMonsterTypeToMonsterBand : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop the old foreign key
            migrationBuilder.DropForeignKey(
                name: "FK_Monsters_MonsterTypes_MonsterTypeId",
                table: "Monsters");

            // Rename the table
            migrationBuilder.RenameTable(
                name: "MonsterTypes",
                newName: "MonsterBands");

            // Rename the column in Monsters table
            migrationBuilder.RenameColumn(
                name: "MonsterTypeId",
                table: "Monsters",
                newName: "MonsterBandId");

            // Rename the index
            migrationBuilder.RenameIndex(
                name: "IX_Monsters_MonsterTypeId",
                table: "Monsters",
                newName: "IX_Monsters_MonsterBandId");

            // Recreate the foreign key with new names
            migrationBuilder.AddForeignKey(
                name: "FK_Monsters_MonsterBands_MonsterBandId",
                table: "Monsters",
                column: "MonsterBandId",
                principalTable: "MonsterBands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Monsters_MonsterBands_MonsterBandId",
                table: "Monsters");

            migrationBuilder.RenameColumn(
                name: "MonsterBandId",
                table: "Monsters",
                newName: "MonsterTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Monsters_MonsterBandId",
                table: "Monsters",
                newName: "IX_Monsters_MonsterTypeId");

            migrationBuilder.RenameTable(
                name: "MonsterBands",
                newName: "MonsterTypes");

            migrationBuilder.AddForeignKey(
                name: "FK_Monsters_MonsterTypes_MonsterTypeId",
                table: "Monsters",
                column: "MonsterTypeId",
                principalTable: "MonsterTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}