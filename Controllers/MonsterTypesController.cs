using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnvilAndQuill.Data;
using AnvilAndQuill.Models;

namespace AnvilAndQuill.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonsterTypesController : ControllerBase
    {
        private readonly MonsterDbContext _context;

        public MonsterTypesController(MonsterDbContext context)
        {
            _context = context;
        }

        // GET: api/MonsterTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MonsterType>>> GetMonsterTypes()
        {
            return await _context.MonsterTypes.ToListAsync();
        }

        // GET: api/MonsterTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MonsterType>> GetMonsterType(int id)
        {
            var monsterType = await _context.MonsterTypes.FindAsync(id);

            if (monsterType == null)
            {
                return NotFound();
            }

            return monsterType;
        }

        // PUT: api/MonsterTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMonsterType(int id, MonsterType monsterType)
        {
            if (id != monsterType.Id)
            {
                return BadRequest();
            }

            _context.Entry(monsterType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MonsterTypeExists(id))
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

        // POST: api/MonsterTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MonsterType>> PostMonsterType(MonsterType monsterType)
        {
            _context.MonsterTypes.Add(monsterType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMonsterType", new { id = monsterType.Id }, monsterType);
        }

        // DELETE: api/MonsterTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMonsterType(int id)
        {
            var monsterType = await _context.MonsterTypes.FindAsync(id);
            if (monsterType == null)
            {
                return NotFound();
            }

            _context.MonsterTypes.Remove(monsterType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MonsterTypeExists(int id)
        {
            return _context.MonsterTypes.Any(e => e.Id == id);
        }
    }
}
