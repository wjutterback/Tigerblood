import { Outlet } from "react-router-dom";

export const PageContainer = () => {
  return (
    <>
      <section className="container-fluid" id="pageContainer">
        <Outlet />
      </section>
    </>
  )
}