import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function CKEditorTable({ value, setValue, isChiTiet }) {
  const editorConfiguration = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "indent",
        "|",
        "undo",
        "redo",
      ],
    },
  };
  const chiTiet = {
    toolbar: {
      items: [],
    },
  };
  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}
        config={isChiTiet ? chiTiet : editorConfiguration}
        data={value}
        onChange={(event, editor) => {
          console.log(editor.getData());
          setValue && setValue(editor.getData());
        }}
        disabled={isChiTiet}
      />
    </div>
  );
}
