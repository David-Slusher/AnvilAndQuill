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
    public class MonsterBandsController : ControllerBase
    {
        private readonly MonsterDbContext _context;

        public MonsterBandsController(MonsterDbContext context)
        {
            _context = context;
        }

        // GET: api/MonsterBands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MonsterBand>>> GetMonsterBands()
        {
            return await _context.MonsterBands.ToListAsync();
        }

        // GET: api/MonsterBands/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MonsterBand>> GetMonsterBand(int id)
        {
            var MonsterBand = await _context.MonsterBands.FindAsync(id);

            if (MonsterBand == null)
            {
                return NotFound();
            }

            return MonsterBand;
        }

        // PUT: api/MonsterBands/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMonsterBand(int id, MonsterBand MonsterBand)
        {
            if (id != MonsterBand.Id)
            {
                return BadRequest();
            }

            _context.Entry(MonsterBand).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MonsterBandExists(id))
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

        // POST: api/MonsterBands
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MonsterBand>> PostMonsterBand(MonsterBand MonsterBand)
        {
            _context.MonsterBands.Add(MonsterBand);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMonsterBand", new { id = MonsterBand.Id }, MonsterBand);
        }

        // DELETE: api/MonsterBands/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMonsterBand(int id)
        {
            var MonsterBand = await _context.MonsterBands.FindAsync(id);
            if (MonsterBand == null)
            {
                return NotFound();
            }

            _context.MonsterBands.Remove(MonsterBand);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MonsterBandExists(int id)
        {
            return _context.MonsterBands.Any(e => e.Id == id);
        }
    }
}
