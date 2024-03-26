"use client";
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
  import styles from "@/components/common/Common.module.css";
  import { apiAdminGetSheets, apiAdminGetSheetDetails, apiAdminUpdateSheetStatus } from "@/app/api";
  import { useCookies } from "next-client-cookies";
  


export default function TabAdvisingSheet() {
  const cookies = useCookies();
  const [data, setData] = useState([]);
  const  [isViewing, setIsViewing] = useState(false);
  const [selectedPrereqs, setSelectedPrereqs] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [selectedRow, setSelectedRow] = useState()
  const [notes, setNotes] = useState("")
  const [headerInfo, setHeaderInfo] = useState("View Sheets To See More Details")


  useEffect(() => {
    onEffect();
  },[])

  const onEffect = async () => {
    const data1 = await apiAdminGetSheets(cookies.get("api_token"));
    data1.forEach((sheet)=> {
      sheet.date = sheet.date.split('T')[0]
    })
    setData(data1);
  };

  const onView = async(e, staticRowIndex, table, row) => {
    const data1 = await apiAdminGetSheetDetails(cookies.get("api_token"), row.original.sheetID)
    var tmp_pre = []
    var tmp_course = []
    data1.forEach((course)=> {
        if(course.isPrereq == 1){
          tmp_pre.push(course.courseName)
        }
        else {
          tmp_course.push(course.courseName)
        }

    })
    
    setSelectedPrereqs(tmp_pre)
    setSelectedCourses(tmp_course)
    setSelectedRow(row.original)
    setNotes(row.original.notes)
    setIsViewing(true);
  }

  const onAccept = async(e) => {
    selectedRow.status = 'Accepted'
    await apiAdminUpdateSheetStatus(cookies.get("api_token"), selectedRow.sheetID, 'Accepted', selectedRow.email, notes)
    setHeaderInfo(selectedRow.firstName + " " + selectedRow.lastName + "\'s " + selectedRow.termCurrent + " Form (ID:" +selectedRow.sheetID+ ") Was ACCEPTED")
    setIsViewing(false)
    onEffect();
  }

  const onReject = async(e) =>{
    selectedRow.status = 'Rejected'
    await apiAdminUpdateSheetStatus(cookies.get("api_token"), selectedRow.sheetID, 'Rejected', selectedRow.email, notes)
    setHeaderInfo(selectedRow.firstName + " " + selectedRow.lastName + "\'s " + selectedRow.termCurrent + " Form (ID:" +selectedRow.sheetID+ ") Was REJECTED")
    setIsViewing(false)
    onEffect();
  }

    const columns = useMemo(
        () => [
          {
            accessorKey: 'firstName', 
            header: 'First Name',
            size: 150,
          },
          { 
            accessorKey: 'lastName', 
            header: 'Last Name',
            size: 150,
          },
          {
            accessorKey: 'email', 
            header: 'Email',
            size: 150,
          },
          {
            accessorKey: 'date', 
            header: 'Date',
            size: 150,
          },
          {
            accessorKey: 'termCurrent',
            header: 'Term',
            size: 150,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            size: 150,
          },
        ],
        [],
      );

      const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableBottomToolbar: true,
    enableRowVirtualization: true,
    positionActionsColumn: 'last',
    enableRowActions: true,
    enableFilters: false,
    enableSorting: false,
    renderRowActions: ({row, staticRowIndex, table }) => (
        <div className='flex flex-row w-60 pr-8'>
        <button
                type="button"
                className={styles.mainPageButton}
                onClick= {(e) => onView(e, staticRowIndex, table, row)}
                >
                View
            </button>
            </div>
      ),
  });
      return (
        <main>
            <div className='pb-5'>
             {isViewing == true ? (
              <span>
            <div className='flex flex-row place-content-evenly'>
            <div className='border border-slate-300 h-40 w-60 rounded-xl'>
            <label className="text-2xl pl-5 text-center font-bold text-white">Viewing</label>
            <div className='border border-slate-300'></div>
                <p className='pl-1 text-white'>Sheet ID: {selectedRow.sheetID}</p>
                <p className='pl-1  text-white'>Date Submitted: {selectedRow.date}</p>
                <p className='pl-1  text-white'>User ID: {selectedRow.userID}</p>
                <p className='pl-1  text-white'>{selectedRow.email}</p>
            </div>
            <div className='border border-slate-300 h-40 w-60 rounded-xl'>
            <label className="text-2xl pl-5 text-center font-bold text-white">Header</label>
            <div className='border border-slate-300'></div>
                <p className='pl-1  text-white'>Last Term: {selectedRow.termLast}</p>
                <p className='pl-1  text-white'>GPA: {selectedRow.gpa}</p>
                <p className='pl-1  text-white'>Current Term: {selectedRow.termCurrent}</p>
                
            </div>
            <div className='border border-slate-300 h-40 w-60 rounded-xl'>
            <label className="text-2xl pl-5 text-center font-bold text-white">Prerequisites</label>
            <div className='border border-slate-300'></div>
            {selectedPrereqs.map((val, i) => (
                <p key={i} className='pl-1  text-white'>{val}</p>
            ))}
            </div>
            <div className='border border-slate-300 h-40 w-60 rounded-xl'>
            <label className="text-2xl pl-5 text-center font-bold text-white">Courses</label>
            <div className='border border-slate-300'></div>
            {selectedCourses.map((val, i) => (
                <p key={i} className='pl-1  text-white'>{val}</p>
            ))}
            </div>
            <span className='flex flex-col align-bottom place-content-evenly w-28 '>
            <button className="bg-white  border-2 border-green-500 font-bold rounded-xl uppercase leading-normal"
            onClick= {(e) => onAccept(e)}
            >
                Accept
            </button>
            <button className="bg-white  border-2 border-red-500 font-bold rounded-xl uppercase leading-normal"
             onClick= {(e) => onReject(e)}
             >
                Reject
            </button>
            </span>
            </div>
            <div className='flex pl-24 pt-5'>
            <input className='w-4/5 rounded'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder=" Notes (optional)"
              maxLength={180}
            />
            </div>
            </span>
            ) : (
                <span>
                  <label className="text-4xl pl-5 text-center font-bold text-white">{headerInfo}</label>
                </span>
            )}
            </div>
            <MaterialReactTable table={table}/>
        </main>
      ); 

      
};