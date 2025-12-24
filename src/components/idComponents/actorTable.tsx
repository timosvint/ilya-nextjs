"use client";

import {
  useReactTable,
    getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import type { PersonResult } from '@/types/getByIdQueryType';
import { useMemo } from "react";
import Image from "next/image";


export const ActorsTable = ({ actors }: { actors: PersonResult[] }) => {

    const actorsBiggerToLower = useMemo(() => {
        return [...actors].sort((a, b) => b.popularity - a.popularity)
    }, [actors])


  const columns: ColumnDef<PersonResult>[] = [
 {
  accessorKey: "profile_path",
  header: "Photo",
  cell: info =>
    info.getValue() ? (
      <Image
        src={`https://image.tmdb.org/t/p/w500${info.getValue()}`}
        alt="actor"
        width={50}
        height={75}
      />
    ) : (
      <div style={{ width: 50, height: 75, background: "#ccc" }} />
  )
},
    {
      accessorKey: "name",
      header: "Actor name",
      cell: info => {
        const actor = info.row.original;
        return actor.profile_path ? (
          <a
            href={`https://www.themoviedb.org/person/${actor.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {actor.name}
          </a>
        ) : (
          actor.name
        );
      },
      },
    {
      accessorKey: "character",
      header: "Role",
      },
    {
      accessorKey: "known_for_department",
      header: "Known for department",
    },
  ];

  const table = useReactTable({
    data: actorsBiggerToLower,
    columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
          pagination: {
            pageSize: 10
        }
    }
  });

    return (
      <>
    <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 10 }}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                  background: "#f5f5f5",
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  verticalAlign: "middle",
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
            <div>
                <span>page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() }</span>
                <button className="w-8 h-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>prev </button>
                <button className="w-8 h-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>next</button>
            </div>
      </>
  );
};