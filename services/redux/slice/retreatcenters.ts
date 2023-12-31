import {
    ActivityType,
    BedType,
    BuildingType,
    CampAreaType,
    DiagramType,
    EditBedStyleCapacity,
    EditBedStyleName,
    MeetingRoomType,
    PricingType,
    RetreatCenterType,
    SpotType
} from "@/types";
import {
    ActivityGenerator,
    IDGenerator
} from "@/utils/functions";
import { ArrayRCSD, } from "@/utils/sampleData";
import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

export type RetreatCenterStateType = {
    loading: boolean;
    error?: string;
    retreatCenters: Array<RetreatCenterType>;
    retreatCenter: RetreatCenterType;
}
const initialState: RetreatCenterStateType = {
    loading: false,
    error: undefined,
    retreatCenters: ArrayRCSD,
    retreatCenter: ArrayRCSD[0],
}

export const RetreatCentersSlice = createSlice({
    name: "retreatcenter",
    initialState,
    reducers: {
        addRetreatCenter: (state, action: PayloadAction<RetreatCenterType>) => {
            const retreatCenter = action.payload;
            state.retreatCenters = [
                retreatCenter,
                ...state.retreatCenters,
            ]
        },
        setRetreatCenter: (state, action: PayloadAction<RetreatCenterType>) => {
            state.retreatCenter = action.payload
            state.retreatCenters = state.retreatCenters.map(rcs => rcs.id === action.payload.id ? action.payload : rcs)
        },
        setRetreatCenterPhoto: (state, action: PayloadAction<RetreatCenterType["photo"]>) => {
            if (state.retreatCenter) state.retreatCenter.photo = action.payload;
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setRetreatCenterMapPhoto: (state, action: PayloadAction<RetreatCenterType["mapPhoto"]>) => {
            if (state.retreatCenter) state.retreatCenter.mapPhoto = action.payload;
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setActivities: (state, action: PayloadAction<Array<ActivityType>>) => {
            state.retreatCenter.amenities.activities = action.payload
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setMeetingRooms: (state, action: PayloadAction<Array<MeetingRoomType>>) => {
            state.retreatCenter.meetingRooms = action.payload
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setBuildings: (state, action: PayloadAction<Array<BuildingType>>) => {
            state.retreatCenter.housing.buildings = action.payload
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setCampAreas: (state, action: PayloadAction<Array<CampAreaType>>) => {
            state.retreatCenter.housing.campAreas = action.payload
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setDiagramStyles: (state, action: PayloadAction<RetreatCenterType["diagramStyles"]>) => {
            if (state.retreatCenter.diagramStyles) state.retreatCenter.diagramStyles = action.payload;
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setItemStyles: (state, action: PayloadAction<RetreatCenterType["itemStyles"]>) => {
            if (state.retreatCenter.itemStyles) state.retreatCenter.itemStyles = action.payload;
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setSpotStyles: (state, action) => {
            state.retreatCenter.spotStyles = action.payload
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setBedStyles: (state, action: PayloadAction<Array<BedType>>) => {
            state.retreatCenter.bedStyles = action.payload
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setSpaceSpots: (state, action: PayloadAction<{ campAreaId: CampAreaType["id"], spaces: CampAreaType["spaces"] }>) => {
            const { campAreaId, spaces } = action.payload;
            if (!state.retreatCenter.housing.campAreas) return;
            state.retreatCenter.housing.campAreas = state.retreatCenter.housing.campAreas?.map((campArea) => {
                if (campArea.id === campAreaId) {
                    return {
                        ...campArea,
                        spaces: spaces
                    }
                }
                return campArea
            })
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)

        },
        setDiagramStyleItems: (state, action: PayloadAction<{ diagramStyleID: DiagramType["id"], items: DiagramType["items"] }>) => {
            const { diagramStyleID, items } = action.payload;
            if (!state.retreatCenter.diagramStyles) return;
            state.retreatCenter.diagramStyles = state.retreatCenter.diagramStyles?.map((diagram) => {
                if (diagram.id === diagramStyleID) {
                    return {
                        ...diagram,
                        items: items
                    }
                }
                return diagram
            })
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)

        },
        setRoomBeds: (state, action: PayloadAction<{ buildingId: BuildingType["id"], rooms: BuildingType["rooms"] }>) => {
            const { buildingId, rooms } = action.payload;
            if (!state.retreatCenter.housing.buildings) return;
            state.retreatCenter.housing.buildings = state.retreatCenter.housing.buildings?.map((building) => {
                if (building.id === buildingId) {
                    return {
                        ...building,
                        rooms: rooms
                    }
                }
                return building
            })
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)

        },
        setCampAreaSpaces: (state, action: PayloadAction<{ id: CampAreaType["id"], spaces: CampAreaType["spaces"] }>) => {
            const { id, spaces } = action.payload;
            state.retreatCenter.housing.campAreas = state.retreatCenter.housing.campAreas?.map((campArea) => {
                if (campArea.id === id) {
                    return {
                        ...campArea,
                        spaces: spaces
                    }
                }
                return campArea
            })
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)

        },
        setBuildingRooms: (state, action: PayloadAction<{ id: BuildingType["id"], rooms: BuildingType["rooms"] }>) => {
            const { id, rooms } = action.payload;
            state.retreatCenter.housing.buildings = state.retreatCenter.housing.buildings?.map((building) => {
                if (building.id === id) {
                    return {
                        ...building,
                        rooms: rooms
                    }
                }
                return building
            })
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)

        },
        setCampAreaName: (state, action: PayloadAction<{ id: CampAreaType["id"], name: CampAreaType["name"] }>) => {
            const { id, name } = action.payload
            state.retreatCenter.housing.campAreas = state.retreatCenter.housing.campAreas?.map((campArea) =>
                campArea.id === id ? ({ ...campArea, name: name }) : campArea
            )
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setBuildingName: (state, action: PayloadAction<{ id: BuildingType["id"], name: BuildingType["name"] }>) => {
            const { id, name } = action.payload
            state.retreatCenter.housing.buildings = state.retreatCenter.housing.buildings?.map((building) =>
                building.id === id ? ({ ...building, name: name }) : building
            )
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        addActivity: (state, action: PayloadAction<ActivityType>) => {
            if (!state.retreatCenter.amenities.activities) state.retreatCenter.amenities.activities = [action.payload]
            else state.retreatCenter.amenities.activities = [...state.retreatCenter.amenities.activities, action.payload]

            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        addMeetingRoom: (state, action: PayloadAction<MeetingRoomType>) => {
            if (!state.retreatCenter.meetingRooms) state.retreatCenter.meetingRooms = [action.payload]
            else state.retreatCenter.meetingRooms = [...state.retreatCenter.meetingRooms, action.payload]

            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        addCampArea: (state, action: PayloadAction<CampAreaType>) => {
            if (!state.retreatCenter.housing.campAreas) state.retreatCenter.housing.campAreas = [action.payload]
            else state.retreatCenter.housing.campAreas = [...state.retreatCenter.housing.campAreas, action.payload]

            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)

        },
        addBuilding: (state, action: PayloadAction<BuildingType>) => {
            if (!state.retreatCenter.housing.buildings) state.retreatCenter.housing.buildings = [action.payload]
            else state.retreatCenter.housing.buildings = [...state.retreatCenter.housing.buildings, action.payload]
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        addDiagramStyle: (state, action: PayloadAction<DiagramType>) => {
            if (!state.retreatCenter.diagramStyles) state.retreatCenter.diagramStyles = [action.payload]
            else state.retreatCenter.diagramStyles = [...state.retreatCenter.diagramStyles, action.payload]
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        addBedPriceDay: (state, action: PayloadAction<{ id: BedType["id"], price: PricingType }>) => {
            const { id, price } = action.payload
            if (!state.retreatCenter.bedStyles) return;
            state.retreatCenter.bedStyles = state.retreatCenter.bedStyles?.map((bedstyle) => {
                if (bedstyle.id === id) {
                    return {
                        ...bedstyle,
                        pricing: Array.isArray(bedstyle.pricing) ? [...bedstyle.pricing, price] : [bedstyle.pricing, price]
                    }
                }
                return bedstyle
            })
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setBedPrice: (state, action: PayloadAction<{ id: BedType["id"], price: BedType["pricing"] }>) => {
            const { id, price } = action.payload
            state.retreatCenter.bedStyles = state.retreatCenter.bedStyles?.map((bedstyle) => {
                if (bedstyle.id === id) {
                    return {
                        ...bedstyle,
                        pricing: price
                    }
                }
                return bedstyle
            })
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        addCampAreastyle: (state, action: PayloadAction<SpotType>) => {
            if (!Array.isArray(state.retreatCenter.spotStyles)) {
                state.retreatCenter.spotStyles = [action.payload]
                return;
            }
            state.retreatCenter.spotStyles = [...state.retreatCenter.spotStyles, action.payload]
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        addSpotStyle: (state, action) => {
            if (!Array.isArray(state.retreatCenter.spotStyles)) {
                state.retreatCenter.spotStyles = action.payload
                return;
            }
            state.retreatCenter.spotStyles = [...state.retreatCenter.spotStyles, action.payload]
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        addBedStyle: (state, action) => {
            if (!Array.isArray(state.retreatCenter.bedStyles)) {
                state.retreatCenter.bedStyles = action.payload
                return;
            }
            state.retreatCenter.bedStyles = [...state.retreatCenter.bedStyles, action.payload]
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        addItemStyle: (state, action) => {
            if (!Array.isArray(state.retreatCenter.itemStyles)) {
                state.retreatCenter.itemStyles = action.payload
                return;
            }
            state.retreatCenter.itemStyles = [...state.retreatCenter.itemStyles, action.payload]
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        editBedStyleName: (state, action: PayloadAction<EditBedStyleName>) => {
            const { id, name } = action.payload
            state.retreatCenter.bedStyles = state.retreatCenter.bedStyles?.map((bedstyle) => {
                if (bedstyle.id === id) return { ...bedstyle, name: name }
                return bedstyle
            })
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        editBedStyleCapacity: (state, action: PayloadAction<EditBedStyleCapacity>) => {
            const { id, capacity } = action.payload
            if (isNaN(capacity)) return console.error("Capacity is not a number")
            state.retreatCenter.bedStyles = state.retreatCenter.bedStyles?.map((bedstyle) => {
                if (bedstyle.id === id) return { ...bedstyle, capacity: capacity }
                return bedstyle
            })
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)
        },
        setRetreatCenterName: (state, action: PayloadAction<string>) => {
            if (!state.retreatCenter) {
                const activity = ActivityGenerator()
                state.retreatCenter = {
                    id: new Date().toString(),
                    name: action.payload,
                    zipCode: "",
                    housing: {},
                    amenities: {},
                    activityStyles: [
                        {
                            id: IDGenerator(),
                            available: true,
                            name: activity,
                            class: activity,
                            capacity: 10,
                            description: "",
                            pricing: [
                                {
                                    price: 20,
                                    per: "head"
                                }
                            ],
                            seasonsAvailable: ["Winter", "Spring", "Summer", "Fall"],
                            duration: {
                                interval: "minutes",
                                time: 30,
                            },
                            photos: [],
                            contracts: [],
                            dailyAvailable: "*",
                            feature: "https://campconnection.net/wp-content/uploads/2023/02/videoplayback.mp4",
                            learnMoreUrl: "CampConnection.net"
                        }
                    ],
                    bedStyles: [
                        {
                            id: IDGenerator(),
                            name: "Bunk Bed",
                            capacity: 2,
                            amount: 5,
                            pricing: {
                                nights: "*",
                                price: 50
                            }
                        },],
                    diagramStyles: [],
                    itemStyles: [],
                    spotStyles: [
                        {
                            id: IDGenerator(),
                            name: "RV Spot",
                            capacity: 10,
                            amount: 5,
                            pricing: {
                                nights: "*",
                                price: 100
                            }
                        },],
                }
                return
            }
            state.retreatCenter.name = action.payload
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)

        },
        setRetreatCenterZipCode: (state, action: PayloadAction<string>) => {
            if (!state.retreatCenter) {
                return
            }
            state.retreatCenter.zipCode = action.payload
            state.retreatCenters = state.retreatCenters.map((rc) => rc.id == state.retreatCenter.id ? state.retreatCenter : rc)

        },
    },
})

export const {
    addRetreatCenter,
    setRetreatCenter,
    setRetreatCenterName,
    setRetreatCenterZipCode,
    addBedStyle,
    editBedStyleName,
    editBedStyleCapacity,
    setBedPrice,
    addBedPriceDay,
    addBuilding,
    setBuildingName,
    setBuildingRooms,
    setRoomBeds,
    setBedStyles,
    setCampAreas,
    addCampAreastyle,
    addItemStyle,
    setBuildings,
    addCampArea,
    setCampAreaName,
    addSpotStyle,
    setCampAreaSpaces,
    setSpaceSpots,
    setSpotStyles,
    setRetreatCenterPhoto,
    setRetreatCenterMapPhoto,
    setItemStyles,
    addMeetingRoom,
    addDiagramStyle,
    setDiagramStyles,
    setMeetingRooms,
    setDiagramStyleItems,
    addActivity,
    setActivities
} = RetreatCentersSlice.actions

export default RetreatCentersSlice.reducer