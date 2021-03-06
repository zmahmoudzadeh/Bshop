import { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Carousel from 'react-bootstrap/Carousel';
import { Modal } from "react-bootstrap";
import { useSnackbar } from 'notistack';
import ServerURL from './Constants';

function ShopBoard(props) {
    const [board, setBoard] = useState([])
    const [showEdit, setShowEdit] = useState(false);
    const [reloadBoard, setReloadBoard] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        clearAddressInputs()
        fetch("http://eunoia-bshop.ir:8000/api/v1/shops/board/list/" + props.shopID, {
            method: 'GET',
        }).then(res => {
            console.log(res.status)
            if (res.ok)
                return res.json()
        }).then(res => {
            console.log(res)
            setBoard(res)
        }).catch(err => console.log(err))
    }, [reloadBoard])

    function clearAddressInputs() {
        for (let i = 0; i < board.length; i++) {
            document.getElementById("board-photo-" + i).value = "";
        }
    }

    function addToBoard(e) {
        let files = e.target.files;
        if (files.length === 0)
            return;
        for (let i = 0; i < e.target.files.length; i++) {
            let fd = new FormData();
            fd.append("image", files[i]);
            fd.append("image_url", "");
            fd.append("shop", parseInt(props.shopID));
            fetch("http://eunoia-bshop.ir:8000/api/v1/shops/board/create/", {
                method: 'POST',
                headers: {
                    "Authorization": "Token " + localStorage.getItem('token')
                },
                body: fd
            }).then(res => {
                console.log(res.status)
                console.log(res)
                if (res.ok) {
                    return res.json();
                }
                return null
            }).then(res => {
                if (!!res) {
                    const tempboard = [...board];
                    tempboard.push(res);
                    setBoard(tempboard)
                    enqueueSnackbar("!?????????? ?????????? ????")
                }
            }).catch(err => console.log(err))
        }
    }

    function changeURL(id, elementID, idx) {
        let url = document.getElementById(elementID).value;
        console.log(url)
        if (!url && !board[idx].image_url)
            return;
        let fd = new FormData();
        fd.append("image_url", url);
        fetch("http://eunoia-bshop.ir:8000/api/v1/shops/board/update/" + id, {
            method: 'PUT',
            headers: {
                "Authorization": "Token " + localStorage.getItem('token')
            },
            body: fd
        }).then(res => res.ok ? res.json() : null).then(res => {
            if (!!res) {
                let tempboard = [...board];
                tempboard[idx].image_url = res.image_url;
                setBoard(tempboard)
                enqueueSnackbar("!???????? ???? ???????????? ?????? ????")
            }
        }).catch(err => console.log(err))
    }

    function deleteBoard(id, i) {
        console.log(id)
        fetch("http://eunoia-bshop.ir:8000/api/v1/shops/board/delete/" + id, {
            method: 'DELETE',
            headers: {
                "Authorization": "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res)
            if (res.ok) {
                document.getElementById("item-" + id).className += " deleted";
                document.getElementById("item-edit-" + id).className += " deleted";
                document.getElementById("item-"+id).removeAttribute('id');
                document.getElementById("item-edit-"+id).removeAttribute('id');
                enqueueSnackbar("!?????????? ?????? ????")
            }
        }).catch(err => console.log(err))
    }

    function changeImage(e, id, idx) {
        let files = e.target.files;
        if (files.length === 0)
            return;
        let fd = new FormData();
        fd.append("image", files[0]);
        fetch("http://eunoia-bshop.ir:8000/api/v1/shops/board/update/" + id, {
            method: 'PUT',
            headers: {
                "Authorization": "Token " + localStorage.getItem('token')
            },
            body: fd
        }).then(res => res.ok ? res.json() : null).then(res => {
            if (!!res) {
                let tempboard = [...board];
                if (!!res.image && !res.image.includes(ServerURL))
                    res.image = ServerURL + res.image
                tempboard[idx] = res;
                setBoard(tempboard)
                enqueueSnackbar("!?????????? ?????????? ???? ???????????? ?????????? ????????")
            }
        }).catch(err => console.log(err))
    }

    return (
        <div>
            {board && Array.isArray(board) && board.length > 0 && <Carousel interval={null} className="carousel">
                {board.map((item, i) => {
                    if (item)
                        return (<Carousel.Item key={i} className="board-item" onClick={() => { if (item?.image_url) window.location.href = item.image_url }} style={{ cursor: item?.image_url ? "pointer" : "default" }}>
                            <div className="img-container" id={"item-" + item.id}>
                                <img src={item.image} alt="board item" />
                            </div>
                        </Carousel.Item>)
                })}
            </Carousel>}
            {props.userState === "m" && <div className="edit-board" onClick={() => { setReloadBoard(true); setShowEdit(true) }}>{!!board && board.length === 0 ? "?????????? ?????????????? ?????????????? ????????????. ???????? ??????????" : "???????????? ?????????? ??????????????"}</div>}
            <Modal centered size="lg" show={showEdit} onHide={() => setShowEdit(false)} style={{ display: "flex" }} className="board-outer-modal">
                <Modal.Header closeButton className="board-modal">
                    <Modal.Title><div>?????????? ?????????? ?????????????? ??????????????</div><label className="create-btn btn" htmlFor="new-board-photo"><AddIcon />?????????? ????????</label></Modal.Title>
                    <input multiple type="file" id="new-board-photo" accept="image/*" onChange={addToBoard} style={{ display: "none" }} />
                </Modal.Header>
                <Modal.Body className="board-modal">
                    <div style={{ direction: "rtl" }}>
                        <Carousel interval={null} className="carousel" id="carousel">
                            {!board || board.length == 0 ?
                                <h4>???????????? ???????? ??????????. ???? ???????? ???? ?????? ?????????? ???????????? ?????????? ?????????? ????????????.</h4>
                                :
                                board.map((item, i) => {
                                    if (item)
                                        return (<Carousel.Item key={i} className="board-item">
                                            <div className="board-item-holder" id={"item-edit-" + item.id}>
                                                <div className="img-container">
                                                    <img src={item.image} alt="board item" />
                                                </div>
                                                <input type="file" id={"board-photo-" + i} accept="image/*" onChange={e => changeImage(e, item.id, i)} style={{ display: "none" }} />
                                                <form className="url-input input-group input-group-lg">
                                                    <input type="text" className="input-lg" id={"board-url-" + i} defaultValue={item.image_url} placeholder="???????? ?????????? ???? ?????? ?????????? ???? ??????????????" />
                                                    <div className="board-btns" style={{ width: "fit-content", margin: "0 auto", direction: "rtl" }}>
                                                        <div className="btn" onClick={() => changeURL(item.id, "board-url-" + i, i)}>{item?.image_url ? "?????????? ????????" : "?????????? ???????? ????????"}</div>
                                                        <label className="btn board-edit-img" htmlFor={"board-photo-" + i}>?????????? ??????</label>
                                                        <div className="btn board-delete" onClick={() => deleteBoard(item.id, i)}>?????? ??????????</div>
                                                    </div>
                                                </form>
                                            </div>
                                        </Carousel.Item>)
                                })}
                        </Carousel>

                    </div>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default ShopBoard;