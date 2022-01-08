import React from 'react';

import { Link } from "react-router-dom";



class page1 extends React.Component {

    render() {

        return (
            <div>
                マッチング結果は＝＝＝＝です。

                    <Link to={`/`}>Go To index</Link>

            </div>
        );
    }
}

export default page1;                   //page1を出力する為に必要