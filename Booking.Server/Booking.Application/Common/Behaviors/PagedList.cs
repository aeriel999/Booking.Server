using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Common.Behaviors
{
    public class PagedList<T>
    {
        private PagedList(List<T> items, int page, int sizeOfPAge, int totalCount)
        {
            this.items = items;
            this.page = page;
            this.sizeOfPage = sizeOfPAge;
            this.totalCount = totalCount;
        }
        public PagedList(){}
        public List<T> items { get; set; }
        public int page { get; set; }
        public int sizeOfPage { get; set; }
        public int totalCount { get; set; }
        public static PagedList<T> getPagedList(IEnumerable<T> query, int page, int sizeOfPage)
        {
            int totalCount = query.Count();
            var items = query.Skip((page - 1) * sizeOfPage).Take(sizeOfPage).ToList();

            return new(items, page, sizeOfPage, totalCount);
        }
    }
}
