import { setUser } from '@/services/redux/slice/user';
import { RootState } from '@/services/redux/store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Nav.module.css";
import { clearLeads } from '@/services/redux/slice/leads';
import { clearAppointments } from '@/services/redux/slice/retreatcenters';
import Image from 'next/image';
import Images from '@/common/images';
const TopNavigation = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const user = useSelector((state: RootState) => state.User.user)
    const retreatcenter = useSelector((state: RootState) => state.RetreatCenter.retreatCenter)
    const logout = () => {
        router.push("/signin")
        dispatch(setUser(undefined))
        dispatch(clearLeads())
        dispatch(clearAppointments())
    }
    if (!user) {
        router.push("/signin");
        return null
    }
    return (
        <nav className={styles.topNav}>
            <h1 className={styles.logo}>{retreatcenter?.name !== "" ? retreatcenter?.name : "CampConnection"}</h1>
            <Image alt={user.firstName} src={Images.ic_logo} width={115} className={styles.ccLogo} />
            <button className={styles.profileButton} onClick={logout}>
                <Image alt={user.firstName} src={"https://thispersondoesnotexist.com/"} height={50} width={50} className={styles.userIcon} />
                {/* <div className={styles.userDetails}>
                    <p className="userName">{String(user.firstName) + String(user.lastName)}</p>
                    <p className="userType">{String(user.userType)}</p>
                    {/* <Link href={`/${user.userCategory}/editprofile`}>Edit profile</Link> */}
                {/* </div>  */}
            </button>
        </nav >
    )
}

export default TopNavigation