using MyCDN.WebApi.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCDN.WebApi.Application.Services
{
    public interface IFileService
    {
        Task<IEnumerable<FileDTO>> GetAllFilesAsync();
        Task<FileDTO> GetFileByIdAsync(int fileId);
        
    }
}
