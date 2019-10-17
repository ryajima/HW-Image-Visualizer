[ソースファイル]
・index.html
・displayer.js
・style.css


[操作方法]
「ファイルを選択」ボタンを押してローカルに保存したJSONを選択してください．


[JSONフォーマット]
(math)
{"qid": "qid",
 "stroke": [{"type": "stroke", "x": [], "y": [] },
	    {"type": "stroke", "x": [], "y": [] },
			:
	   ],
 "result": [{"type": "MATHML", "value": "value"}]
}

(text)
{"qid": "qid",
 "stroke": [{"type": "stroke", "x": [], "y": [] },
	    {"type": "stroke", "x": [], "y": [] },
			:
	   ],
 "result": "value"
}
