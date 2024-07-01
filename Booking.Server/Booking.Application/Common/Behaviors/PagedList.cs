namespace Booking.Application.Common.Behaviors;
public class PagedList<T>
{
    private PagedList(List<T>? items, int page, int sizeOfPAge, int totalCount)
    {
        this.items = items;
        this.page = page;
        this.sizeOfPage = sizeOfPAge;
        this.totalCount = totalCount;
    }
    public PagedList(){}
    public List<T>? items { get; set; }
    public int page { get; set; }
    public int sizeOfPage { get; set; }
    public int totalCount { get; set; }

    //ToDo Nazar
    public static PagedList<T>? getPagedList(IEnumerable<T>? query, int page, int sizeOfPage)
    {
        int totalCount = query == null ? 0 : query.Count();

        var items = query == null ? null : query.Skip((page - 1) * sizeOfPage).Take(sizeOfPage).ToList();

        if(items == null)
            return null;

        return new(items, page, sizeOfPage, totalCount);
    }
}
