import { createColumnHelper } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { type TaskProps } from '@/hooks/useTaskGetQuery';

const columnHelper = createColumnHelper<TaskProps>();
export const columns = [
  columnHelper.accessor('done', {
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  }),
  columnHelper.accessor('task', {
    header: 'Task',
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor('notes', {
    header: 'Notes',
    cell: (props) => <p>{props.getValue()}</p>,
  }),
  columnHelper.accessor('statusName', {
    header: 'Status',
    cell: (props) => <p>{props.getValue()}</p>,
  }),
];
