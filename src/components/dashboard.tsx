import { DropDownMenu } from '@/components/dropdown';
import {
  HomeIcon,
  LineChartIcon,
  Package2Icon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '@/components/icons';
import { PageSize } from '@/components/pageSize';
import { Search } from '@/components/search';
import { Badge } from '@/components/ui/badge';
import { useLogin } from '@/hooks/useLogin';
import { usePagination } from '@/hooks/usePagination';
import { useSearchCondition } from '@/hooks/useSearchCondition';
import { useTaskGetQuery } from '@/hooks/useTaskGetQuery';
import { columns } from '@/lib/table/columns';
import { DataTable } from '@/lib/table/data-table';

export function Dashboard() {
  const { onLogoutClick } = useLogin();
  const { pagination, onPaginationChange, onPageSizeChange } = usePagination();
  const { search, onSearchChange } = useSearchCondition();

  const tasks = useTaskGetQuery({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    search,
  });

  if (tasks.data)
    return (
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
          <div className="flex flex-col gap-2">
            <div className="flex h-[60px] items-center px-6">
              <a className="flex items-center gap-2 font-semibold">
                <Package2Icon className="size-6" />
                <span className="">Acme Inc</span>
              </a>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-4 text-sm font-medium">
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <HomeIcon className="size-4" />
                  Home
                </a>
                <a className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50">
                  <ShoppingCartIcon className="size-4" />
                  Orders
                  <Badge className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
                    12
                  </Badge>
                </a>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <PackageIcon className="size-4" />
                  Products
                </a>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <UsersIcon className="size-4" />
                  Customers
                </a>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <LineChartIcon className="size-4" />
                  Analytics
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
            <a className="lg:hidden">
              <Package2Icon className="size-6" />
              <span className="sr-only">Home</span>
            </a>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Recent Orders</h1>
            </div>

            <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <Search search={search} onSearchChange={onSearchChange} />
              <PageSize
                pageSize={pagination.pageSize}
                onPageSizeChange={onPageSizeChange}
              />
              <DropDownMenu onLogout={onLogoutClick} />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="rounded-lg border p-2 shadow-sm">
              <DataTable
                data={tasks.data.result}
                total={tasks.data.count ?? 0}
                columns={columns}
                pagination={pagination}
                onPaginationChange={onPaginationChange}
              />
            </div>
          </main>
        </div>
      </div>
    );

  return <div>...Loading</div>;
}
