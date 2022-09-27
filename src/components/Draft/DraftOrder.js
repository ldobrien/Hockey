// draftOrder
import React, { Component } from 'react';
import {saveDraftOrder} from '../../store/actions/draftOrderActions'
import './DraftBoard.css'
import { connect } from 'react-redux';


class DraftOrder extends Component {
    state = {
        rounds: 15,
        order: [{
                    "id": 2,
                    "title": "Trever",
                    "logo": "https://play-lh.googleusercontent.com/-vSJcWH6jyPM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl8mgMWh1caIcLysD62FX-3YEwNHA/photo.jpg"
                  },
                  {
                    "id": 4,
                    "title": "Isaak",
                    "logo": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Dar_es_Salaam_Rapid_Transit_Phase_I_icon.png"
                  },
                  {
                    "id": 5,
                    "title": "Gramma",
                    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Eo_circle_green_letter-g.svg/1024px-Eo_circle_green_letter-g.svg.png?20200417132654"                  
                },
                {
                    "id": 1,
                    "title": "Lisa",
                    "logo":"https://secure.gravatar.com/avatar/30d69047dc2825b2f9aee1e371119d22?d=https://www.idlethumbs.net/forums/uploads/monthly_2017_08/L.png.74730ec2e536d76e49ba91ba0a6b0980.png"
                  },
                  {
                    "id": 6,
                    "title": "Grampa",
                    "logo": "https://play-lh.googleusercontent.com/-Jpbevue0b_Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckJPSie_anTLYyLHG2OvoAvFnNQ9g/photo.jpg"    
                  },
                {
                    "id": 3,
                    "title": "Braden",
                    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Vancouver_Canucks_logo.svg/1200px-Vancouver_Canucks_logo.svg.png"
                  },
                  {
                    "id": 0,
                    "title": "Traci",
                    "logo": "https://forums.oscommerce.com/uploads/monthly_2017_12/T_member_532.png"
                  },
                  {
                    "id": 7,
                    "title": "Kris",
                    "logo": "data:image/png;base64,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"    
                  },
        ]
    }

    shuffle = () => {
        var array = [...this.state.order]
        console.log("SHUFFLE", array)
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        this.setState({
            order: array
        })
      }

    saveDraftOrder = () => {
        var order = this.state.order
        var newState = []
        for(var i = 0; i < this.state.rounds; i++){
            if(i == 0 || i % 2 === 0){
                newState.push(...order)
            } else {
                order.reverse()
                newState.push(...order)
                order.reverse()
            }
        }
        this.props.saveDraftOrder(newState)
    }

    handleChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        this.setState({
            rounds: result
        })
      };

    render() {
        return (
            <div>
            <button className="btn z-depth-0"  onClick={this.shuffle}>Shuffle</button>
            {this.state.order.map(({ id, title, logo }) => (
                <div key={id} className="sameRow">
                    <img className="photo" src={logo}/>
                    <p className="title">{title}</p>
                </div>
            ))}
            <input
                type="text"
                placeholder={this.state.rounds}
                value={this.state.rounds}
                onChange={this.handleChange}
            />
            <button className="btn pink-lighten-1 z-depth-0" onClick={this.saveDraftOrder}>Save Draft Order</button>
            </div>
        )
    }
    
}
// const mapStateToProps = {}

const mapDispatchToProps = {
    saveDraftOrder
};

export default connect(
    // mapStateToProps,
    null,
    mapDispatchToProps,)(DraftOrder);

// order: [
//     {
//         "id": 2,
//         "title": "Trever",
//         "logo": "https://play-lh.googleusercontent.com/-vSJcWH6jyPM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl8mgMWh1caIcLysD62FX-3YEwNHA/photo.jpg"
//       },
//       {
//         "id": 4,
//         "title": "Isaak",
//         "logo": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Dar_es_Salaam_Rapid_Transit_Phase_I_icon.png"
//       },
//       {
//         "id": 5,
//         "title": "Gramma",
//         "logo": "https://www.chetanasforum.com/uploads/monthly_2017_10/F.png.32957ae7fa0a55557cc1d7dfe145c759.png"                  
//     },
//     {
//         "id": 1,
//         "title": "Lisa",
//         "logo":"https://secure.gravatar.com/avatar/30d69047dc2825b2f9aee1e371119d22?d=https://www.idlethumbs.net/forums/uploads/monthly_2017_08/L.png.74730ec2e536d76e49ba91ba0a6b0980.png"
//       },
//       {
//         "id": 6,
//         "title": "Grampa",
//         "logo": "https://play-lh.googleusercontent.com/-Jpbevue0b_Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckJPSie_anTLYyLHG2OvoAvFnNQ9g/photo.jpg"    
//       },
//     {
//         "id": 3,
//         "title": "Braden",
//         "logo": "https://play-lh.googleusercontent.com/-2yYAJhUg700/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclccNVSkhWdOm_6qJAP7osjM5rI2Q/photo.jpg"
//       },
//       {
//         "id": 0,
//         "title": "Traci",
//         "logo": "https://forums.oscommerce.com/uploads/monthly_2017_12/T_member_532.png"
//       },
//       {
//         "id": 7,
//         "title": "Kris",
//         "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUeiOX///8Ag+QeieUAfeMAf+OlyPIAgeQWhuUOhOSy0fQtjuY0kee/2fbT5fnZ6frq8/zx9/16se1vq+yVwPGNvPBnp+tKmulfo+rd6/qFuO88lOfG3ffm8fxOnemexfKrzfMAeeK21PUgKCsEAAAKz0lEQVR4nO2d6XLiOhCFbYGQhNkJkEAC3Hn/h7w24AUstbV0CxNyaqrmRxb8pbUdqdVO0t+u5NkPQK4/wtfXH+Hr648QQz+zf6PNans8ZAOlmFKD7HDcrjaj6ewnwqeTEi7n483ngXEuGFNSyiT/lySX/6ViTORfmHxuxvMl5UOQEX6NVxMl8oglsHJUwSar8xfVg5AQ/py3irMutqYU42o7IqHEJ/zeZ5xdmqObpGQ8W32jPw8y4XTNuUvsWrEUfD3FfSRMwtkq4e6xa8WSq9UM8anQCJenTKhwvgujEtkJbXxFIpyvOUOhK8X4GimQKITTHULrfJTkO5QeiUA4zgj4royDcQ8Icz4SvKtEFswYSDjNBCHflTGwrQYRznaU8SvFd0FjTgDhck3U/x4l+Tpg7vAnHAUtXtyk+Cg64fxA3QHvJQ7zuIT7SA20luT7iITzDHcBYyeWeYXRh/AjegCvkvwjCuHiGLcHNiV2C3rCbyQD4SepnC2yK+HH8JmAOeLQtaU6En7GWMTA4p+EhIss3iRvlsqcOqML4eypXbCWVC4LVQfC6fNbaCnu4DfsCUfDZ3M1NLRfp1oTfvQngoXsJ39bwn2/AHNE22WqJWHvAPP1jSWiHWEPAa2jaEW4f95KFJJdFG0IezbI1LIabiwIR30FzBEtJo1uwmmf5sFHDbun/k7CWX8jWIh3LuC6CBd9WGtDUl3L8C7CrB+LbbNkFkb42fcQ5kHs8IswYW/niaY65gyQ8LvPw2itIbh3AxEuPTIqniEJjjYQ4e41AHPEox/hRz9XozoJoCuaCeevMMqU4uYNfzNh72fCpoBZ0Ui4f8bhi7+Y0UmZCF+qjRYytlMT4eGV2mgheXAjHL3OOFpKGLyinnD5am20ENenM+gJ1/1fcLel1vaEHq6X6RTys1c5jQZ6N6wldF+uDUY62SGKD+0PFzrvXZ5E7mwJ3Y9g5EDbQKysyRDIXFtmTo+hPbDREbr92kBCaLtskTg2Jt3KRkM4dp8p/Akh+7oYuPYWoWkPGkL3EPoTQjvzzhFMtEFsE4495kJfQrECAJ0jmIu3g9gm9AihLyHbIgPqgtgi9DrL9iNkwC6ZTxMtJFrDaYvQa+vCi1Bpp68boF8EdXPiI6HfJr4PodEMpP4RTDQLm0fCtdev9iCUmTnv1zuCxe99XJ0+EHqaCndCmdAAti3GA+HJb+/CI4bm66NhgAk7gYQ+U0XiTiiF+arhMgywNWHcE848rb0joRTmzb+l/yBzk7gfa+4JV57O15GQmw8aFuGbmOp+oXRP6HtQ4UYIHE0HN9HiYaSZ0Ds3z4lQs3asIogA+GgT7wj9JsPEjRAwhEucffb7KfGO0HuHzYEQMIQ4EcwlTITfEQgBQ4gUweRhJGsS+o6kDoSAIVwO0LYwVfPP2CT0nO4Te0LAEC4xc8ibk36D8Mt/o9uSEDCEqIAJb6wJG4SW25s62REChhCxiRZiZy3hNsCy2BAChhA3gvlHNXpDgzDgroENIXBMixzBIjtDRxjQDW0I5cBoCPGmiUq89i414TngWLubUEqjISQAbHbEmtB/NrQhZFEBm/6iJpwE/MIuQmnOBiEBTJJJm3AZ0tk7CKUw5rli2CWdVNXrK8J5yMl9B6H5mhJRBJupGRXhOCR/BiY0G0IywIRVn1kR7slaKT9rv0gKmKhNizAoGxgiNBtCQsBEVkvgijBkKIUI+Ub7JWLAxmBaEQalsZkJzYaQFjBhj4Q/QTlCRkKmz3FJ6aaJUpWBKgnDLo6YCM2GkDiCjTOokvBfUCKbgfA/oyEkB6yPSkvCAPubGAmNfokeMGHlpmVJuKEgNKbQH+nTc1k5hpeEIc7CSGjUF31yZ+UuSsKALYzEnTA9k6d3VhsZJeExLmG6pW6n1R2MkjAs69mdMGBz1vKRyn2vBOUDPQjn1HeqyoG8JAw7efUgTE+0XbF6pJIwrGyJD2Fg1+98pPKctCIM+3U+hMRX48ot05IwbGjzIgw4zbNRaS6eGMN8IUU58T/G8An9MNeO7tZDqx/GH0sLLehq27XG0ujz4VWElZke58Poa5qbVlSrt9aaJva6tNKEqJ221qW03uLbnIFBZaRa3oLUH84EUKCDyEi1/CGJxy8B8xFTmr+8JZkyWh6fZJ+mjKA0Xp27aIBF1VRrn2ZKsddWA4L5eiQlcFp7bST7pYXmV8BEMnNpBwoj1dovJdnzLgCr1q+/HXgVgZFq7XmTnFs0AcHSDuGpzy21zi1Izp7Sr7u/G1DaAd9Itc+ePkP+igbCe0Cw4FHYbKV5ovb54YbghPRxfGbAZTzkEgeaM2DCc/xaQGXVhdu97S5pzvEpczHq71Pmu0D/ULuiJheDMp+m8Y3AlcM1ZlfU5NOQ5kTVMlWvuDwBYjvV5EQR57VV4uYrXSHZkQ/S5rXR5ibW3wpcrMQzUtrcROL80vrDjekniEZKm19KnSNcfzpQrhLJSOlzhMnzvGuZCZGKNxnyvAM6ohsh5IZxKjUacvXp71uU4v/MiChGynDfIsKdmfLbATe8xHg9geHOTIx7T+X3A24YwUgZ7z3FuLt2E1ToMLwWnvHuWpT7h+VDAG82CjZSxvuHce6Q3n4CcMOhRgq4QxrnHvBVkBsONFLAPeBId7lvzwHUxg06kYLucse6j3/9GcANB5UWBe/jR6qpcHsSwA2H2ACwpkKsuhi3RwHccICRAutiRKxtUkiY3bD/7YiO2ibR6tNcfwxww95GqqM+TbwaQxdBbtjzrKirxlDEOlEXQW7Yr9p2Z52oiLW+rjITehmp7lpffkel/oSQG/ZJ7bOo1xaz5l4hyA17mB2LmntR6yYmsBt2N1JWdROj1r5MYDfsbKSsal/GrV+aS5y0P3zRj5uRsqxfGrcGbQK7YTcjZVmDNnIdYdgNO9kd6zrCkWtB51PG1lgNenSyfxb7WtCx63kXA6pRLiG0r+f9+2uyv0Fd/d//boQ3eL/FG7yj5OXeM2P00m/8rqDXaqde73v6/e/seoP3ruEcx0YQeD4AEv7+9x++wTss3+A9pHQXr9AkJx0EXYS//33Av/+dzm/wXu43eLd6j+eMjnnCnjDd9xMRelmUI2E/Ee0ALQn7iCjsAG0J+4doGUF7wr4NN1aDjBthOurTvDi0mCacCSkrPLgKuCEWQpjOeuKIpepcqnkSpotJH9bhatK12PYnzP3i81sq7/CDgYTpx/C5LVUOrQdRT8L0+6mdUSpwTwaFMF0en7ePKnbQrhoWYTH5PyeM0n6aDyRM55NnHNuwDMjZQCZM0030MErrhSgOYTo/xO2N4uAVwADCYnMj3vSvbLYr0AnT5TpSU5V87T6EYhDmC9VdjCUO37ksQ3EJc7+RUXdHkTn4CALCNB1nlHHkmbn4UizCglHQ9EcpwvlQCPO2uiMYcyTfBbbPq1AI8+lxzXGXOYyvg8aXWkiE+dxxygSS7ZBKZKeA+eFeaIS5ZqsEobVKrlZI4bsIkzDXdM2CljqK8zVK76uFTJgWdS4zzjzugkjJeLZyNridwifM9XPeKu6S3ZuoPPTbs/ll3QEiISz0NV5NlGCdg49UTLDJioauEBlhoeV8vPk8MM4Fy1HzlntpvJf/czAmOGeTz814jjZu6kRKeNPPbDrarLbHQzbIwZQcZIfjdrUZTWfAHVI0xSB8rv4IX19/hK+vP8LX1//4NaE8UM++/gAAAABJRU5ErkJggg=="    
//       },
//   ]