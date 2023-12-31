"use client";
import Images from '@/common/images'
import { RootState } from '@/services/redux/store';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation"
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styles from "./Nav.module.css"
type SideNavType = { id: string; name: string; img: string | StaticImport; category: string }
const SideNavigation = () => {
    const pathname = usePathname();
    const paths = pathname.split("/")
    const currentCatergory = paths[1]
    const currentPage = paths.at(-1);

    const sideNavs: Array<SideNavType> = [
        {
            category: "campconnection",
            id: "leads",
            name: "CC Leads",
            img: currentCatergory === "campconnection" && currentPage === "leads" ? Images["ic_cc_arrow_white"] : Images["ic_cc_arrow"]
        },
        {
            category: "retreatcenter",
            id: "groupleads",
            name: "Group Leads",
            img: currentPage === "groupleads" ? Images["ic_group_white"] : Images["ic_group"]
        },
        {
            category: "retreatcenter",
            id: "calendar",
            name: "Calendar",
            img: currentPage === "calendar" ? Images["ic_calendar_white"] : Images["ic_calendar"]
        },
        {
            category: "retreatcenter",
            id: "dashboard",
            name: "Dashboard",
            img: currentPage === "dashboard" ? Images["ic_dashboard_white"] : Images["ic_dashboard"]
        },
        {
            category: "retreatcenter",
            id: "sales",
            name: "Sales",
            img: currentPage === "sales" ? Images["ic_dollar_white"] : Images["ic_dollar"]
        },
        {
            category: "retreatcenter",
            id: "tasks",
            name: "Tasks",
            img: currentPage === "tasks" ? Images["ic_task_checked_white"] : Images["ic_task_checked"]
        },
        {
            category: "retreatcenter",
            id: "contacts",
            name: "Contacts",
            img: currentPage === "contacts" ? Images["ic_contact_white"] : Images["ic_contact"]
        },
        {
            category: "retreatcenter",
            id: "tickets",
            name: "Tickets",
            img: currentPage === "tickets" ? Images["ic_ticket_white"] : Images["ic_ticket"]
        },
        {
            category: "retreatcenter",
            id: "book",
            name: "Book",
            img: currentPage === "book" ? Images["ic_book_white"] : Images["ic_book"]
        },
    ]
    const settingsNav: Array<SideNavType> = [
        {
            category: "retreatcenter",
            id: "profile",
            name: "Camp Profile",
            img: currentPage === "profile" ? Images["ic_camp_white"] : Images["ic_camp"]
        },
        {
            category: "retreatcenter",
            id: "userprofile",
            name: "User Profile",
            img: currentPage === "userprofile" ? Images["ic_staff_id_white"] : Images["ic_staff_id"]
        },
        {
            category: "retreatcenter",
            id: "setupcamp",
            name: "Setup Camp",
            img: currentPage === "setupcamp" ? Images["ic_setup_white"] : Images["ic_setup"]
        },
    ]
    const router = useRouter()
    const user = useSelector((state: RootState) => state.User.user)
    const isInSettings = currentCatergory === "settings"
    const toRender = isInSettings ? settingsNav : sideNavs
    const clearRouteAndReroute = (newRoute: string) => {
        router.replace(newRoute);
    };
    const [darkBG, setDarkBG] = useState(false);
    if (!user) return null;
    return (
        <>
            {darkBG ? <div className={styles.darkBackground} /> : null}
            <nav className={styles.sideNav} onMouseOver={() => setDarkBG(true)} onMouseLeave={() => setDarkBG(false)}>
                <div className={styles.navButtonsContainer}>
                    <div className={styles.sideNavButtons}>
                        {toRender.map((nav, i) => {
                            return (
                                <button
                                    key={i}
                                    className={currentPage == nav.id ? styles.buttonActive : styles.button}
                                    onClick={() => {
                                        if (nav.category !== user.userCategory) clearRouteAndReroute(isInSettings ? `/settings/${nav.category}/${nav.id}` : `/${nav.category}/${nav.id}`)
                                        else router.push(isInSettings ? `/settings/${nav.category}/${nav.id}` : `/${nav.category}/${nav.id}`)
                                    }}
                                >
                                    <div style={{
                                        minWidth: "50px",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>

                                        <Image
                                            alt={`${nav.name} icon`}
                                            src={nav.img}
                                            height={20}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <p className={currentPage === nav.id ? styles.navTextActive : styles.navText}>{nav.name}</p>
                                </button>
                            )
                        })}
                    </div>
                    <button
                        onClick={() => router.push(isInSettings ? `/${sideNavs[0].category}/${sideNavs[0].category === "campconnection" ? "leads" : "groupleads"}` : `/settings/retreatcenter/profile`)}
                        className={styles.settingsButton}>
                        <div style={{
                            minWidth: "50px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Image
                                alt={"Settings icon"}
                                src={isInSettings ? Images.ic_back : Images.ic_settings}
                                height={20}
                                style={{ objectFit: "cover" }}
                            /></div>
                        <p className={styles.navText}>{isInSettings ? "Go Back" : "Settings"}</p>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default SideNavigation