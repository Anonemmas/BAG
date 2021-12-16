import React from "react"
import SideBar from "../components/sidebar"
import Tovisit from "../components/tovisit"

export default function DashboardToVisit(){
    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <SideBar />
                <div className="dashboard-body">
                    <Tovisit />
                </div>
            </div>
        </div>
    )
}