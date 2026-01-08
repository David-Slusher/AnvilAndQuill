using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnvilAndQuill.Data;
using AnvilAndQuill.DTOs;
using AnvilAndQuill.Models;
using AnvilAndQuill.Extensions;

namespace AnvilAndQuill.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonstersController : ControllerBase
    {
        private readonly MonsterDbContext _context;

        public MonstersController(MonsterDbContext context)
        {
            _context = context;
        }

        // GET: api/Monsters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Monster>>> GetAllMonsters()
        {
            return await _context.Monsters.ToListAsync();
        }

        // GET: api/Monsters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Monster>> GetMonsterById(int id)
        {
            var monster = await _context.Monsters.FindAsync(id);

            if (monster == null)
            {
                return NotFound();
            }

            return monster;
        }

        //GET: api/Monsters/ByType
        [HttpGet("ByType/{monsterTypeId}")]
        public async Task<ActionResult<IEnumerable<Monster>>> GetMonstersByType(int monsterTypeId)
        {
            var monsters = await _context.Monsters
                .Where(m => m.MonsterTypeId == monsterTypeId)
                .Select(m => new MonsterDTO
                {
                    Id = m.Id,
                    Name = m.Name,
                    MonsterTypeId = m.MonsterTypeId
                })
                .ToListAsync();
            return Ok(monsters);
        }

        // PUT: api/Monsters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //update existing monster, full update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMonster(int id, Monster monster)
        {
            if (id != monster.Id)
            {
                return BadRequest();
            }

            _context.Entry(monster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MonsterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // Update monster partial update
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateMonster(int id, [FromBody] MonsterUpdateDTO updateDTO)
        {
            var monster = await _context.Monsters.FindAsync(id);
            if (monster == null)
            {
                return NotFound();
            }
            monster.UpdateFromDTO(updateDTO);
            await _context.SaveChangesAsync();
            return NoContent();

        }

        // POST: api/Monsters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Monster>> CreateMonster(Monster monster)
        {
            _context.Monsters.Add(monster);
            await _context.SaveChangesAsync();

            return Ok(monster);
        }

        // DELETE: api/Monsters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMonster(int id)
        {
            var monster = await _context.Monsters.FindAsync(id);
            if (monster == null)
            {
                return NotFound();
            }

            _context.Monsters.Remove(monster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MonsterExists(int id)
        {
            return _context.Monsters.Any(e => e.Id == id);
        }
    }
}
