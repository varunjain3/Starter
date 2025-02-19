import QGRSForms from "../Components/QgrsComponents/QGRSForms";

const QGRS = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">
                            <div className="row justify-content-center">
                                QGRS Mapper
                            </div>
                        </div>
                        <div className="card-body">
                            <QGRSForms />
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    );
}
  
export default QGRS;