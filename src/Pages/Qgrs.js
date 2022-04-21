import QGRSForm from "../Components/QgrsComponents/QGRSForm";

const QGRS = () => {
    return (
      <div className="container">
        {/* <h3>Stats Page</h3> */}
        {/* center the div */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            {/* center heading vertically */}
                            <div className="row justify-content-center">
                                QGRS Mapper
                            </div>
                        </div>
                        <div className="card-body">
                            <QGRSForm />

                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
  }
  
  export default QGRS;