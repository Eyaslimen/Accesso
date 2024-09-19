using Accesso_backend.Models;
using Accesso_backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Accesso_backend.Dtos;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly AccessContext _context;

    public CategoriesController(AccessContext context)
    {
        _context = context;
    }
    // HTTP GET ALL CATEGORIES WITH THEIR PRODUCTS
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    {
        var categories = await _context.Categories
                                       .Include(c => c.products)
                                       .Select(c => new CategoryDto
                                       {
                                           Id = c.Id,
                                           Name = c.Name!,
                                           // ajouter l'ensemble des produits associé a cet categorie, p heka ligne m tab products bch nhawlouh l productDto!
                                           Products = c.products!.Select(p => new ProductDto
                                           {
                                               Id = p.Id,
                                               Name = p.Name!,
                                               Description = p.Description!,
                                               price = p.price,
                                               imageUrl=p.imageUrl
                                           }).ToList()
                                       }).ToListAsync(); 
        return Ok(categories);
    }
    //HTTP GET BY ID exp : /api/Categories/1 
    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDto>> GetCategory(int id)
    {
        var category = await _context.Categories
                                     .Include(c => c.products) //inclure la liste des produits associées
                                     .Where(c => c.Id == id) // Filtre by category id
                                     .Select(c => new CategoryDto
                                     {
                                         Id = c.Id,
                                         Name = c.Name!,
                                         Products = c.products!.Select(  //Select est une méthode d'extension LINQ qui projette chaque élément d'une collection dans une nouvelle forme.
                                         //Pour chaque élément p dans Products, la lambda (=>) crée un nouvel objet ProductDto ( respo de la transformation)
                                             p => new ProductDto
                                         {
                                             Id = p.Id,
                                             Name = p.Name!,
                                             Description = p.Description!,
                                             price = p.price,
                                             imageUrl= p.imageUrl
                                         }
                                             ).ToList()
                                     }).FirstOrDefaultAsync(); //Prend la premiere resultat ou bien null

        if (category == null)
        {
            return NotFound();
        }

        return category;
    }
    //GET products by category
    [HttpGet("{categoryId}/products")]
    public IActionResult GetProductsByCategory(int categoryId, [FromQuery] double? minPrice, [FromQuery] double? maxPrice , [FromQuery] string? query)
    {
        // acceder au produits d'une categorie bien précis
        var products = _context.Products.Where(p => p.CategoryId == categoryId);
        // filter by price
        if (minPrice.HasValue)
        {
            products = products.Where(p => p.price >= minPrice.Value);
        }
        if (maxPrice.HasValue)
        {
            products = products.Where(p => p.price <= maxPrice.Value);
        }
        //search !! 
        if (!string.IsNullOrEmpty(query))
        {
            products = products.Where(p => p.Name.Contains(query) || p.Description.Contains(query));
        }
        return Ok(products.ToList());
    }
    // HTTP ADD NEW CATEGORY
    [HttpPost]
    public async Task<ActionResult<Category>> PostCategory(Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
    }


    // DELETE A CATEGORY BY ID
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}