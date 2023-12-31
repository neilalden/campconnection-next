"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Images from "@/common/images";
import {
  ArrayRCSD,
  UsersSampleData,
  RetreatCenterUserData,
} from "@/utils/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import TextInput from "@/components/TextInput";
import {
  StatesInUSA,
  StatesWithCitiesAPI,
  TimeZones,
  weekdays,
} from "@/utils/variables";
import { GET } from "@/services/api";
import { default as statesWithCities } from "@/utils/statesWithCities.json";
import DropDown, { OptionType } from "@/components/DropDown";
import DropDownUsers, { UsersOptionType } from "@/components/DropDownUsers";
import CheckBox from "@/components/CheckBox";
import FileUpload from "@/components/FileUpload";
import FileButton from "@/components/FileButton";
import RadioButton from "@/components/RadioButton";
import DateInput from "@/components/DateInput";
import { setUserPhoto } from "@/services/redux/slice/user";
const options = StatesInUSA.map((state) => ({ label: state, value: state }));
const Userprofile = () => {
  // const retreatcenter = useSelector((state: RootState) => state.RetreatCenters.retreatCenters)[0]
  const dispatch = useDispatch()
  const retreatcenter = ArrayRCSD[0];
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [timezone, setTimezone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [representative, setRepresentative] = useState<UsersOptionType>();
  const [stateOptions] = useState<Array<OptionType>>(
    Object.keys(statesWithCities).map((s) => ({ label: s, value: s }))
  );
  // @ts-ignore
  const cityOptions: Array<OptionType> = Array.isArray(statesWithCities[state]) ? statesWithCities[state].map((c) => ({ label: c, value: c }))
    : [];
  const timeZoneOptions: Array<OptionType> = TimeZones.map((tz) => ({
    label: tz,
    value: tz,
  }));
  const userOptions: Array<UsersOptionType> = UsersSampleData.map((user) => ({
    label: `${user.firstName} ${user.lastName} • ${user.userType}`,
    value: user.id,
    user: user,
  }));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileImage = useSelector(
    (state: RootState) => state.User.user?.photo
  );
  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      dispatch(setUserPhoto(imageUrl)); // Dispatch the action to update the Redux state
    }
  };
  return (
    <div className={styles.container}>
      <div className={["card", styles.headerContainer].join(" ")}>
        <div className={styles.logoContainer}>
          <Image
            src={profileImage ? profileImage : Images.ic_user_profile} // Use imageUrl or the default image
            alt="Company Logo"
            className={styles.logo}
            height={150}
            width={150}
            style={{ objectFit: "contain" }}
          />
          <div className={styles.overlay} onClick={handleEditClick}></div>
          <p className={styles.editText}>Edit</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>
        <div className={styles.campName}>
          <div className={styles.campNameHead}>
            <h3>{RetreatCenterUserData.userType} Team</h3>
            <Image
              alt="groupdropdown"
              src={Images.ic_user_group} />
          </div>
          <p className={styles.stateText}>{RetreatCenterUserData.position}</p>
        </div>
        <div className={styles.videoIntro}></div>
      </div>
      <div className="row-between" style={{ width: "100%" }}>
        <div
          className={["card", styles.addressAndContactInfoContainer].join(" ")}
        >
          <h4 className={styles.cardTitle}>Name & Birthdate</h4>
          <form>
            <TextInput
              type="text"
              containerClassName={styles.inputStyle}
              label="First Name"
              value={firstName}
              setValue={(e) => setFirstName(e.target.value)}
            />

            <TextInput
              label="Middle Name"
              value={middleName}
              setValue={(e) => setMiddleName(e.target.value)}
              containerClassName={styles.inputStyle}
            />

            <TextInput
              type="text"
              containerClassName={styles.inputStyle}
              label="Last Name"
              value={lastName}
              setValue={(e) => setMiddleName(e.target.value)}
            />

            <DateInput
              name="Birthdate"
              label="Birthdate"
              value={birthDate}
              setValue={setBirthDate}
              containerClassName={styles.inputStyle}
            />
          </form>
        </div>
        <div className={["card", styles.availabilityContainer].join(" ")}>
          <h4 className={styles.cardTitle}>Contact Info</h4>
          <form>
            <TextInput
              label="Phone Number"
              type="tel"
              value={phoneNumber}
              setValue={(e) => setPhoneNumber(e.target.value)}
              containerClassName={styles.inputStyle}
            />
            <TextInput
              label="Email"
              type="email"
              value={email}
              setValue={(e) => setEmail(e.target.value)}
              containerClassName={styles.inputStyle}
            />
            <TextInput
              label="Website"
              type="url"
              value={website}
              setValue={(e) => setWebsite(e.target.value)}
              containerClassName={styles.inputStyle}
            />
            <DropDown
              htmlFor="Time Zone"
              options={timeZoneOptions}
              value={timezone}
              setValue={setTimezone}
              containerClassName={styles.inputStyle}
            />
          </form>
        </div>

        <div
          className={["card", styles.addressAndContactInfoContainer].join(" ")}
        >
          <h4 className={styles.cardTitle}>Address</h4>
          <form>
            <DropDown
              htmlFor="State"
              options={stateOptions}
              value={state}
              setValue={setState}
              containerClassName={styles.inputStyle}
            />
            <DropDown
              htmlFor="City"
              options={cityOptions}
              value={city}
              setValue={setCity}
              containerClassName={styles.inputStyle}
            />
            <TextInput
              label="Street"
              value={street}
              setValue={(e) => setStreet(e.target.value)}
              containerClassName={styles.inputStyle}
            />
            <TextInput
              label="Zipcode"
              value={zipcode}
              setValue={(e) => setZipcode(e.target.value)}
              containerClassName={styles.inputStyle}
            />
          </form>
        </div>
      </div>

      <div className={["card", styles.scheduleContainer].join(" ")}>
        <h4 className={styles.cardTitle}>Business Schedule</h4>
        <div className="row-between">
          <SchedulePicker season={"Winter"} />
          <SchedulePicker season={"Spring"} />
          <SchedulePicker season={"Summer"} />
          <SchedulePicker season={"Fall"} />
        </div>
      </div>

      <div className={styles.userDocs}>
        <h1>Uploaded Docs</h1>
        <div className={styles.docsContainer}>
          <div className={styles.uploadedDocs}>
            <p>ValidID</p>
            <Image alt="document icon" src={Images.ic_doc_icon} />
          </div>
          <div className={styles.uploadedDocs}>
            <p>Elegibility</p>
            <Image alt="document icon" src={Images.ic_doc_icon} />
          </div>
        </div>
      </div>
    </div>
  );
};
type ScheduleType = {
  label: string;
  value: boolean;
  editMode: boolean;
  from: {
    hour: number;
    ampm: "am" | "pm";
  };
  to: {
    hour: number;
    ampm: "am" | "pm";
  };
};
const SchedulePicker = ({ season }: { season: string }) => {
  const schedule: Array<ScheduleType> = weekdays.map((wd) => ({
    label: wd,
    value: false,
    editMode: false,
    from: {
      hour: 9,
      ampm: "am",
    },
    to: {
      hour: 5,
      ampm: "pm",
    },
  }));
  const [isOpenAnytime, setIsOpenAnytime] = useState(false);
  const [weekSchedule, setWeekSchedule] =
    useState<Array<ScheduleType>>(schedule);
  const onChange = ({ label, value }: { label: string; value: boolean }) => {
    setWeekSchedule((prev) => {
      return prev.map((val) => {
        if (val.label === label) return { ...val, value: !val.value };
        return val;
      });
    });
  };
  const toggleEdit = (sched: ScheduleType) => {
    setWeekSchedule((prev) => {
      return prev.map((val) => {
        if (val.label === sched.label)
          return { ...val, editMode: !val.editMode };
        return val;
      });
    });
  };
  const setHour = (value: string) => { };
  return (
    <div className={styles.scheduleCard}>
      <h3 className={styles.scheduleCardTitle}>{season}</h3>
      <form className={styles.scheduleForm}>
        <RadioButton
          name={`isOpenAnytime---${season}`}
          label="Open anytime"
          value={isOpenAnytime}
          onChange={() => setIsOpenAnytime(true)}
          containerClassName={styles.inputStyle}
        />
        <span>Campers can book you anytime your calendar is not blocked</span>
        <RadioButton
          name={`!isOpenAnytime---${season}`}
          label="Specific Hours"
          value={!isOpenAnytime}
          onChange={() => setIsOpenAnytime(false)}
          containerClassName={styles.inputStyle}
        />
        <span>Campers can only book with set hours</span>
        {!isOpenAnytime ? (
          <div className={styles.scheduleCheckboxContainer}>
            {weekSchedule.map((sched, i) => {
              if (sched.value) {
                return (
                  <div key={i} className="row-between">
                    <CheckBox
                      label={sched.label}
                      value={sched.value}
                      name={`${season}---${sched.label}`}
                      onChange={() => onChange(sched)}
                      containerStyle={{ width: "65px" }}
                    />
                    {sched.editMode ? (
                      <div>
                        <DropDown
                          options={Array(12)
                            .fill(0)
                            .map((i) => i + 1)}
                          value={String(sched.from.hour)}
                          setValue={setHour}
                        />
                      </div>
                    ) : (
                      <p className={styles.scheduleString}>
                        {`${sched.from.hour + sched.from.ampm} - ${sched.to.hour + sched.to.ampm
                          }`}
                      </p>
                    )}
                    <button
                      type="button"
                      className={styles.buttonSpan}
                      onClick={() => toggleEdit(sched)}
                    >
                      edit
                    </button>
                  </div>
                );
              }
              return (
                <div key={i} className="row">
                  <CheckBox
                    label={sched.label}
                    value={sched.value}
                    name={`${season}---${sched.label}`}
                    onChange={() => onChange(sched)}
                    containerStyle={{ width: "65px" }}
                  />
                  <span className={styles.spanClosed}>Closed</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Userprofile;
