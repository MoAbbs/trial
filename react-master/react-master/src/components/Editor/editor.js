import React from 'react';
import { Component } from 'react';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw , ContentState,EditorState ,convertFromHTML} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
class CEditor extends Component {


    state={
        editorState:null
    }
    onEditorStateChange = (e)=>{
        this.setState({
          ...this.state,
          editorState:e
        },()=>{
            const rawContentState = convertToRaw(e.getCurrentContent());
            const markup = draftToHtml(rawContentState);
            this.props.HandelChange(markup.toString())
        })
    }
    componentDidMount(){
        if(this.props.value)
        {
            const blocksFromHTML = convertFromHTML(this.props.value);
            const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
            );
            this.setState({
                editorState:EditorState.createWithContent(state)
            })
        }
    }
 
    render(){
        let {editorId} = this.props
        let {editorState} = this.state
        return(
            <div className="editor_container">
                <Editor
                    editorState={editorState}
                    toolbarClassName={`toolbar${editorId}`}
                    wrapperClassName={`wrapper${editorId}`}
                    editorClassName={`editor${editorId} editor_textarea`}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
};

export default CEditor;