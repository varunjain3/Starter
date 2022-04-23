import G4HunterForms from "../Components/G4HunterComponents/G4HunterForms";

const G4Hunter = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">
                            <div className="row justify-content-center">
                                G4Hunter
                            </div>
                        </div>
                        <div className="card-body">
                            <G4HunterForms />
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    );
}
  
export default G4Hunter;