using MyCDN.WebApi.Application.DTOs;
using MyCDN.WebApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCDN.WebApi.Application.Mappers
{
    public static class FileMapper
    {
        public static FileDTO ToDTO(this MyFile file)
        {
            return new FileDTO
            {
                Id = file.Id,
                FileName = file.FileName,
                Password = file.Password, 
                
            };
        }
    }
}
