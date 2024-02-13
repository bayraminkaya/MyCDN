using Microsoft.AspNetCore.Mvc;
using MyCDN.WebApi.Application.Services;
using MyCDN.WebApi.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCDN.WebApi.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpGet]
        public IActionResult GetAllFiles()
        {
            var files = _fileService.GetAllFilesAsync().Result;
            return Ok(files);
        }

        [HttpGet("{id}")]
        public IActionResult GetFileById(int id)
        {
            var file = _fileService.GetFileByIdAsync(id).Result;

            if (file == null)
                return NotFound();

            return Ok(file);
        }
    }
}
