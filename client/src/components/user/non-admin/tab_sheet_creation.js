"use client";
import { useMemo, useState } from 'react';
  import styles from "@/components/common/Common.module.css";
  import { apiAdminGetCourses, apiGetCourseLevels, apiGetPrereqLevels, apiGetTerms, apiSubmitSheet } from "@/app/api";
  import { useCookies } from "next-client-cookies";
  import Select from "react-dropdown-select";
  

var reloadUsers = true;

function LevelCourseRow({allOptions, index, optionsLevels, selection, setSelection}){
    const [optionsCourse, setOptionsCourse] = useState([])
    const [selectedLevel, setSelectedLevel] = useState([])
    const [selectedCourse, setSelectedCourse] = useState([])

    function updateSelection(level, course){
        selection[index] = {Level: level, Course: course}
        setSelection(selection)
        //setSelection([...selection, {i: index, l: level, c: course}])
    }
    function prereqLevelChanged(value){
        setSelectedLevel(value[0].level)
        updateSelection(value[0].level, selectedCourse)
        var filtered = []
        for(var i = 0; i < allOptions.length; ++i){
            if(allOptions[i].level == value[0].level) filtered.push(allOptions[i])
        }
        setOptionsCourse(filtered)
    }
    function setValues(value){
        setSelectedCourse(value[0].courseName)
        updateSelection(selectedLevel, value[0].courseName)
    }
    return(
        <div key={index} className="text-left pb-5 flex flex-row">
        <label className='text-2xl pl-5'> Level </label>
        <Select
            options={optionsLevels}
            labelField="level"
            valueField="level"
            className='text-2xl pl-5'
            onChange={(value) => prereqLevelChanged(value)}
        />
        <label className='text-2xl pl-5'> Course </label>
        <Select
            options={optionsCourse}
            labelField="courseName"
            valueField="courseName"
            className='text-2xl pl-5'
            onChange={(value) => setValues(value)}
        />
        </div>
    )

}


export default function SheetCreation() {
  const cookies = useCookies();
  const [gpa, setGPA] = useState("");
  const [currentTerm, setCurrentTerm] = useState("")
  const [lastTerm, setLastTerm] = useState("")
  const [termOptions, setTermOptions] = useState([])
  const [prereqOptionsLevelLoaded, setPrereqOptionsLevelLoaded] = useState([])
  const [courseOptionsLevelLoaded, setCourseOptionsLevelLoaded] = useState([])

  const [allPrereqs, setAllPrereqs] = useState([])
  const [allCourses, setAllCourses] = useState([])

  const [preReqRows, setPrereqRows] = useState([])
  const [courseRows, setCourseRows] = useState([])

  const [selectedPrereqs, setSelectedPrereq] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])



  const onLoad = async () => {
    const data = await apiAdminGetCourses(cookies.get("api_token"));
    for(var i =0; i<data.length; ++i){
        if(data[i].isPrereq == 1) allPrereqs.push(data[i])
        else  allCourses.push(data[i])
    }
    setAllPrereqs(allPrereqs)
    setAllCourses(allCourses)
    const data1 = await apiGetTerms(cookies.get("api_token"));
    setTermOptions(data1);
    const data2 = await apiGetPrereqLevels(cookies.get("api_token"));
    setPrereqOptionsLevelLoaded(data2)
    const data3 = await apiGetCourseLevels(cookies.get("api_token"));
    setCourseOptionsLevelLoaded(data3)
    //setPrereqRows([...preReqRows, <LevelCourseRow index={preReqRows.length} allOptions={allPrereqs} optionsLevels={prereqOptionsLevelLoaded}/>])
  };
  
  if (reloadUsers) {
    onLoad();
    reloadUsers = false;
  }


    function addPrereq(){
        setSelectedPrereq([...selectedPrereqs, {Level: 0, Course: "None"}])
        setPrereqRows([...preReqRows, <LevelCourseRow index={preReqRows.length} allOptions={allPrereqs} optionsLevels={prereqOptionsLevelLoaded} selection={selectedPrereqs} setSelection={setSelectedPrereq}/>])
    }

    function addCourse(){
        setCourseRows([...courseRows, <LevelCourseRow index={courseRows.length} allOptions={allCourses} optionsLevels={courseOptionsLevelLoaded} selection={selectedCourses} setSelection={setSelectedCourses}/>])
    }

    function onSubmit(e){
        apiSubmitSheet(
            cookies.get("api_token"), cookies.get("userID"),
            lastTerm, currentTerm, gpa,
            selectedPrereqs, selectedCourses
        )
    }

      return (
        <div className={styles.mainFormUser}>
            <label className="text-5xl pl-5">Term Data</label>
            <div className={styles.simpleDivision}></div>
            <div className="text-left pb-5 flex flex-row" id="hahah">
                <label className='text-2xl pl-5'> Last Term </label>
                <Select
                    options={termOptions}
                    labelField="term"
                    valueField="term"
                    onChange={(values) => setLastTerm(values[0].term)}
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
                onChange={(values) => setCurrentTerm(values[0].term)}
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


            {preReqRows.map((val, i) => (

            preReqRows[i]
            ))}





            <div className={styles.simpleDivision}></div>
            <div className="content-stretch pb-5 flex-row">
            <label className="text-5xl pl-5">Courses</label>
            <div className='w-40 float-right pr-10'>
            <button
                type="button"
                className={styles.mainPageButton}
                onClick={addCourse}
                >
                Add
            </button>
            </div>
            </div>
            <div className={styles.simpleDivision}></div>


            {courseRows.map((val, i) => (

            courseRows[i]
            ))}
            
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

/*
            <div key={i} className="text-left pb-5 flex flex-row">
            <label className='text-2xl pl-5'> Level </label>
            <Select
                options={prereqOptionsLevel}
                labelField="level"
                valueField="level"
                className='text-2xl pl-5'
                id="prereqLevel-{key}"
                onChange={(values) => prereqLevelChanged(values)}
            />
            <label className='text-2xl pl-5'> Course </label>
            <Select
                options={prereqOptionsCourse}
                labelField="courseName"
                valueField="courseName"
                className='text-2xl pl-5'
                onChange={(values) => setValues(values, `prereqCourse-${i}`)}
            />
            </div>
*/

/*
<div className="text-left pb-5 flex flex-row">
            <label className='text-2xl pl-5'> Level </label>
            <Select
                options={courseOptionsLevel}
                labelField="level"
                valueField="level"
                className='text-2xl pl-5'
                onChange={(values) => courseLevelChanged(values)}
            />
            <label className='text-2xl pl-5'> Course </label>
            <Select
                options={courseOptionsCourse}
                labelField="courseName"
                valueField="courseName"
                className='text-2xl pl-5'
                onChange={(values) => setValues(values)}
            />
            </div>
*/