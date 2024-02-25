"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Pagination } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import classes from "./table.module.css";
import KeepMountedModal from "../modal";

export default function BasicTable(props) {
  const {
    columns,
    data,
    pagesCount,
    href,
    stepper = false,
    actionFuncModal = () => {},
    textModal = "",
    noUpdate = false,
    actionModal = "",
    fastDelete = false,
  } = props;

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [row, setRow] = useState({});
  const handleOpen = (val) => setOpen(val);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleChange = (e, value) => {
    params.set("page", value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleDelete = (id, row) => {
    console.log(row);
    handleOpen(true);
    setId(id);
    setRow(row);
  };

  return (
    <>
      <KeepMountedModal
        open={open}
        setOpen={handleOpen}
        actionFunc={fastDelete ? () => {} : actionFuncModal}
        text={textModal}
        action={actionModal}
        id={id}
        row={row}
      />
      <TableContainer component={Paper}>
        <Table
          sx={{ width: "100%" }}
          size={`${stepper ? "small" : ""}`}
          aria-label="simple table"
        >
          <TableHead style={{ background: "#000000de" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell style={{ color: "#fff" }} key={column}>
                  {column}
                </TableCell>
              ))}

              {!noUpdate && (
                <TableCell style={{ color: "#fff" }}>Edit</TableCell>
              )}
              <TableCell style={{ color: "#fff" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}

                {!noUpdate && (
                  <TableCell>
                    <Link className={classes.link} href={`${href}${row.id}`}>
                      <EditIcon />
                    </Link>
                  </TableCell>
                )}

                <TableCell>
                  <RemoveCircleOutlineIcon
                    onClick={() =>
                      fastDelete
                        ? actionFuncModal(row.id)
                        : handleDelete(row.id, row)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          onChange={handleChange}
          style={{ marginTop: 5, background: "#fff" }}
          count={pagesCount}
        />
      </TableContainer>
    </>
  );
}
