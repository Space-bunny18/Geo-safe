import {NavLink} from "react-router-dom";
import {LayoutDashboard, TriangleAlert, Route, Siren, Settings, Shield, Radio, Map,} from "lucide-react";
function Sidebar(){
    const navigation=[
        {section : "COMMAND", items:[{label:"OVERVIEW", path: "/dashboard",icon: LayoutDashboard,},{label:"RISK MAP", path: "/dashboard", icon: Map,},{label:"Incidents", path:"/incidents",icon:TriangleAlert,},{label:"Road Network", path:"/roads", icon: Route,},],},
        {section:"RESPONSE", items:[{label: "Emergency Response", path:"/response", icon:Siren,},],},
    ];
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-mark">
                    <Shield size={19} strokeWidth={2.3}/>
                </div>
                <div>
                    <div className="brand-name">GEOSAFE</div>
                    <div className="brand-subtitle">RISK INTELLIGENCE</div>
                </div>
            </div>
            <div className="sidebar-status">
                <span className="status-dot"/>
                <span>SYSTEM OPERATIONAL</span>
            </div>
            <nav className="sidebar-navigation">
                {navigation.map((group)=>(
                    <div className="nav-group"key={group.section}>
                        <div className="nav-selection-title">{group.section}</div>
                        {group.items.map((item)=>{
                            const Icon=item.icon;
                            return(<NavLink key={item.label} to={item.path}className={({isActive})=>`nav-item${isActive?"active":""}`}><Icon size={17} strokeWidth={.9}/> <span>{item.label}</span></NavLink>);
                        })}
                    </div>
                ))}
            </nav>
            <div className="sidebar-bottom">
                <NavLink to="/field" className="field-link"><Radio size={17}/><div><span>Field Operation</span><small>Open officer portal</small></div></NavLink>
                <button className="settings-button">
                    <Settings size={17}/>
                    <span>System Settings</span>
                </button>
                <div className="sidebar-footer">
                    <div className="authority-avatar">DA</div>
                    <div className="authority-info"><strong>District Authority</strong><span>Control Center</span></div>
                    <div className="online-indicator"/>
                </div>
            </div>
        </aside>
    );
}
export default Sidebar;