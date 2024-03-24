"use client";
import { useMemo, useState } from 'react';
  import styles from "@/components/common/Common.module.css";
  import { apiAdminGetCourses, apiGetCourseLevels, apiGetPrereqLevels, apiGetTerms } from "@/app/api";
  import { useCookies } from "next-client-cookies";
  import Select from "react-dropdown-select";
  

var reloadUsers = true;


export default function SheetCreation() {
  const cookies = useCookies();
  const [gpa, setGPA] = useState("");
  const [termOptions, setTermOptions] = useState([])
  const [prereqOptionsLevel, setPrereqOptionsLevel] = useState([])
  const [prereqOptionsCourse, setPrereqOptionsCourse] = useState([])
  const [courseOptionsLevel, setCourseOptionsLevel] = useState([])
  var allPrereqs = []
  var allCourses = []

  const onLoad = async () => {
    const data = await apiAdminGetCourses(cookies.get("api_token"));
    for(var i =0; i<data.length; ++i){
        console.log(data[i].isPrereq)
        if(data[i].isPrereq == 1) allPrereqs.push(data[i])
        else  allCourses.push(data[i])
    }
    setPrereqOptionsCourse(allPrereqs)
    const data1 = await apiGetTerms(cookies.get("api_token"));
    //console.log(data1)
    setTermOptions(data1);
    const data2 = await apiGetPrereqLevels(cookies.get("api_token"));
    //console.log(data2)
    setPrereqOptionsLevel(data2)
    const data3 = await apiGetCourseLevels(cookies.get("api_token"));
    //console.log(data3)
    setCourseOptionsLevel(data3)
  };
  
  if (reloadUsers) {
    onLoad();
    reloadUsers = false;
  }
  function setValues(values){
    console.log(values)
    }

    function addPrereq(e){
        console.log(e)
    }

    function addCourse(e){
        console.log(e)
    }
    function onSubmit(e){

    }

      return (
        <div className={styles.mainFormUser}>
            <label className="text-5xl pl-5">Term Data</label>
            <div className={styles.simpleDivision}></div>
            <div className="text-left pb-5 flex flex-row">
                <label className='text-2xl pl-5'> Last Term </label>
                <Select
                    options={termOptions}
                    labelField="term"
                    valueField="term"
                    onChange={(values) => setValues(values)}
                />
                <label className='text-2xl pl-5'> Last GPA </label>
                <input
                //ref={refInputPasswordRetyped}
                className='text-2xl pl-5'
                value={gpa}
                onChange={(e) => setGPA(e.target.value)}
                placeholder="4.0"
            />
            <label className='text-2xl pl-5'> Current Term </label>
            <Select
                options={termOptions}
                labelField="term"
                valueField="term"
                className='text-2xl pl-5'
                onChange={(values) => setValues(values)}
            />
        
        </div>
        <div className={styles.simpleDivision}></div>
        <div className="content-stretch pb-5 flex-row">
            <label className="text-5xl pl-5">Pre-requisites</label>
            <div className='w-40 float-right pr-10'>
            <button
                type="button"
                className={styles.mainPageButton}
                onClick={addPrereq}
                >
                Add
            </button>
            </div>
            </div>
            <div className={styles.simpleDivision}></div>
            <div className="text-left pb-5 flex flex-row">
            <label className='text-2xl pl-5'> Level </label>
            <Select
                options={prereqOptionsLevel}
                labelField="level"
                valueField="level"
                className='text-2xl pl-5'
                onChange={(values) => setValues(values)}
            />
            <label className='text-2xl pl-5'> Course </label>
            <Select
                options={prereqOptionsCourse}
                labelField="courseName"
                valueField="courseName"
                className='text-2xl pl-5'
                onChange={(values) => setValues(values)}
            />
            </div>
            <div className={styles.simpleDivision}></div>
            <div className="content-stretch pb-5 flex-row">
            <label className="text-5xl pl-5">Courses</label>
            <div className='w-40 float-right pr-10'>
            <button
                type="button"
                className={styles.mainPageButton}
                onClick={addPrereq}
                >
                Add
            </button>
            </div>
            </div>
            <div className={styles.simpleDivision}></div>
            <div className="text-left pb-5 flex flex-row">
            <label className='text-2xl pl-5'> Level </label>
            <Select
                options={prereqOptionsLevel}
                labelField="level"
                valueField="level"
                className='text-2xl pl-5'
                onChange={(values) => setValues(values)}
            />
            <label className='text-2xl pl-5'> Course </label>
            <Select
                options={prereqOptionsCourse}
                labelField="courseName"
                valueField="courseName"
                className='text-2xl pl-5'
                onChange={(values) => setValues(values)}
            />
            </div>
            <div className={styles.simpleDivision}></div>
            <div className="px-[67px] pb-[30px] content-center">
            <button
            type="button"
            className={styles.mainPageButton}
            onClick={onSubmit}
            >
            Submit
          </button>
          </div>
        </div>
        
        ); 

      
};