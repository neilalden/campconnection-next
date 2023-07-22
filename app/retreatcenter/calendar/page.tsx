"use client"
import { RootState } from '@/services/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Colors from '@/common/colors'
import { months, weekdays } from '@/utils/variables'
import { AppointmentType, SetStateType } from '@/types'
import CalendarNavigation from '@/components/CalendarNavigation'
import { addLead } from '@/services/redux/slice/leads'
import LeadsColumn from '@/components/LeadsColumn'
import SimpleCalendar from '@/components/SimpleCalendar'
import MainCalendar from '@/components/MainCalendar'
import Divider from '@/components/Divider'

const CalendarPage = () => {
  const retreatCenters = useSelector((state: RootState) => state.RetreatCenters.retreatCenters)
  // const RetreatCenter = retreatCenters["Eatern Point Retreat House"]
  const RetreatCenter = retreatCenters[0]

  const [date, setDate] = useState<Date>(new Date())
  const [progress, setProgress] = useState(66);
  if (!RetreatCenter) return;
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3 className={styles.overviewTitle}>Overview</h3>
      </div>
      <div className={styles.mainRow}>
        <LeadsColumn />
        <div className={styles.calendarColumn}>
          <CalendarNavigation date={date} setDate={setDate} />
          <div className={styles.calendarContainer}>
            <div className={styles.progressbarsContainer}>
              <div className='row'>
                <div className={styles.progressbarContainer}>
                  <CircularProgressbar value={progress} styles={{
                    trail: {
                      strokeWidth: 1
                    },
                    path: {
                      stroke: Colors.green300,
                    }
                  }} />
                </div>
                <div>
                  <p>{progress}%</p>
                  <p>Weekend</p>
                </div>
              </div>
              <div className='row'>
                <div className={styles.progressbarContainer}>
                  <CircularProgressbar value={progress} styles={{
                    trail: {
                      strokeWidth: 1
                    },
                    path: {
                      stroke: Colors.yellow300,
                    }
                  }} />
                </div>
                <div>
                  <p>{progress}%</p>
                  <p>Weekend</p>
                </div>
              </div>
              <p className={styles.monthTitle}>{months[date.getMonth()]}</p>
            </div>
            <SimpleCalendar date={date} RetreatCenter={RetreatCenter} />
            {/* <MainCalendar date={date} /> */}
          </div>
          <Divider className={styles.divider} />
          <div className="row">
            <div className={styles.prevCalendarContainer}>
              <div className={styles.progressbarsContainer}>
                <div className='row'>
                  <div className={styles.progressbarContainer}>
                    <CircularProgressbar value={progress} styles={{
                      trail: {
                        strokeWidth: 1
                      },
                      path: {
                        stroke: Colors.green300,
                      }
                    }} />
                  </div>
                  <div>
                    <p>{progress}%</p>
                    <p>Weekend</p>
                  </div>
                </div>
                <div className='row'>
                  <div className={styles.progressbarContainer}>
                    <CircularProgressbar value={progress} styles={{
                      trail: {
                        strokeWidth: 1
                      },
                      path: {
                        stroke: Colors.yellow300,
                      }
                    }} />
                  </div>
                  <div>
                    <p>{progress}%</p>
                    <p>Weekend</p>
                  </div>
                </div>
                <p className={styles.monthTitle}>{months[date.getMonth() - 1]}</p>
              </div>
              <SimpleCalendar date={new Date(new Date(date).setMonth(new Date(date).getMonth() - 1))} RetreatCenter={RetreatCenter} />
              {/* <MainCalendar date={date} /> */}
            </div>

            <div className={styles.nextCalendarContainer}>
              <div className={styles.progressbarsContainer}>
                <div className='row'>
                  <div className={styles.progressbarContainer}>
                    <CircularProgressbar value={progress} styles={{
                      trail: {
                        strokeWidth: 1
                      },
                      path: {
                        stroke: Colors.green300,
                      }
                    }} />
                  </div>
                  <div>
                    <p>{progress}%</p>
                    <p>Weekend</p>
                  </div>
                </div>
                <div className='row'>
                  <div className={styles.progressbarContainer}>
                    <CircularProgressbar value={progress} styles={{
                      trail: {
                        strokeWidth: 1
                      },
                      path: {
                        stroke: Colors.yellow300,
                      }
                    }} />
                  </div>
                  <div>
                    <p>{progress}%</p>
                    <p>Weekend</p>
                  </div>
                </div>
                <p className={styles.monthTitle}>{months[date.getMonth() + 1]}</p>
              </div>
              <SimpleCalendar date={new Date(new Date(date).setMonth(new Date(date).getMonth() + 1))} RetreatCenter={RetreatCenter} />
              {/* <MainCalendar date={date} /> */}

            </div>
          </div>
        </div>
        <div className={styles.groups}>
          {
            RetreatCenter && RetreatCenter?.appointments?.map((appointment, i) => {
              return (
                <button key={i} type='button' className={styles.groupCard} style={{ background: appointment.color }}>
                  <h3>{appointment.groupName}</h3>
                </button>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}



export default CalendarPage