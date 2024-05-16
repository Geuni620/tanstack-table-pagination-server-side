import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
} from 'src/components/ui/pagination';

import { DropDownMenu } from '@/components/dropdown';
import {
  HomeIcon,
  LineChartIcon,
  Package2Icon,
  PackageIcon,
  SearchIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '@/components/icons';
import { useLogin } from '@/hooks/useLogin';
import { type TaskProps } from '@/hooks/useTaskGetQuery';
import { columns } from '@/lib/table/columns';
import { DataTable } from '@/lib/table/data-table';

type TableDataProps<TData> = {
  tableData: TData[];
};

export function Dashboard<TData extends TaskProps>({
  tableData,
}: TableDataProps<TData>) {
  const { onLogoutClick } = useLogin();

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
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="bg-white pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  placeholder="Search orders..."
                  type="search"
                />
              </div>
            </form>

            <DropDownMenu onLogout={onLogoutClick} />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="rounded-lg border p-2 shadow-sm">
            <DataTable data={tableData} columns={columns} />
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
}
