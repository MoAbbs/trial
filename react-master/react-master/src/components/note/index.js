import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from "components/Modal/main";
import { withTranslation } from 'react-i18next'
import { Formik, Field } from 'formik';
import { get } from 'lodash';
import Styles from "./styles.module.less"
import Request from "requests/Request";
const Input = (props)=>{
  return <div class="form-group">
    <label for="NoteArea">Note</label>
    <textarea focus={true} {...props.field} className="form-control" id="NoteArea" rows="5" name="note" placeholder="Enter a note"></textarea>
  </div>
}
function Note(props) {
  const {model, product__notes, user, company} = props
  const note = get(product__notes, model, {company, user, model});
  const [state, setState] = useState({
    show: false,
    value: note,
  })
  // console.log('here user', user)
  if(!company) return <></>
  const addNote = (values)=>{
    Request.sendRequest('update_models/', {data: {product__notes: [values]}}).then(({data})=>{
      setState({ ...state, show: false, value: get(data, `product__notes[0]`) });
    })
  }
  return (
    <section>
      <button
        className={`${Styles.mainBtn} ${state?.value?.id && Styles.active} btn`}
        onClick={() => {
          setState({ ...state, show: true });
        }}
      >
        {state?.value.id ? 'Edit ':''} Note
      </button>
      {state.show && <Formik initialValues={state.value} onSubmit={addNote}>
        {({handleSubmit})=>(
        <Modal
            show={state?.show}
            handleClose={() => {
              setState({ ...state, show: false });
            }}
            title="Note"
            save="Note"
            closeBtn="Close"
            handleSubmit={() => {
              handleSubmit();
            }}
            >
              <Field name="note" component={Input}></Field>
          </Modal>
        )}
      </Formik>}

    </section>

  )
}
export default withTranslation()(
  withRouter(connect((state, props)=>({
    user: state.user?.user?.id,
    company: props.match?.params?.company,
  }))(Note))
) 