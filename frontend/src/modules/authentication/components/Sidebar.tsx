import sidebarImg from "./SidebarDraft.png"

const Sidebar = () => {
    return (
        <section style={{flex: "1"}}>
            <img src={sidebarImg} alt="Sidebar Image" style={{width:"100%", height:"100%"}} />
        </section>
    );
};

export default Sidebar;
