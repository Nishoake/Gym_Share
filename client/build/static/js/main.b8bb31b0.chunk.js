(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{73:function(e,t,a){e.exports=a(90)},78:function(e,t,a){},85:function(e,t,a){},90:function(e,t,a){"use strict";a.r(t);var n,l,r,c,u,i,o,m,d=a(0),b=a.n(d),E=a(68),s=a.n(E),y=(a(78),a(29)),p=a(10),g=a(27),h=a.n(g),v=a(35),f=a(9),O=a(5),j=function(e){var t=e.label,a=e.equipment,n=e.eventHandler,l=e.buttonLabel;return b.a.createElement("div",null,b.a.createElement("h2",null,t),b.a.createElement("table",null,b.a.createElement("tbody",null,b.a.createElement("tr",null,b.a.createElement("th",null,"Category"),b.a.createElement("th",null,"Weight"),b.a.createElement("th",null,"Owner"),b.a.createElement("th",null,"Number"),b.a.createElement("th",null,"Avatar "),b.a.createElement("th",null,l)),a.map((function(e){return b.a.createElement("tr",{key:e.id},b.a.createElement("td",null,e.category),b.a.createElement("td",null,e.weight),b.a.createElement("td",null,e.name),b.a.createElement("td",null,e.number),b.a.createElement("td",null,b.a.createElement("img",{src:e.avatar_url,alt:"Gym Leader",className:"avatar"})),b.a.createElement("td",null,b.a.createElement("button",{onClick:function(){return n(e.id)}},l)))})))))},w=a(22),q=Object(O.gql)(n||(n=Object(w.a)(["\n  query filterOtherEquipmentByType($type: String!){\n    allOtherEquipment(\n      type: $type\n    ) {\n      id,\n      category,\n      weight,\n      name,\n      number,\n      avatar_url\n    }\n  }\n"]))),k=Object(O.gql)(l||(l=Object(w.a)(["\n  query filterMyEquipmentByType($type: String!){\n    myEquipment(\n      type: $type\n    ) {\n      id,\n      category,\n      weight,\n      name,\n      number,\n      avatar_url\n    }\n  }\n"]))),H=Object(O.gql)(r||(r=Object(w.a)(["\n  query{\n    myBorrowingHistory{\n      id,\n      category,\n      weight,\n      check_out_timestamp,\n      check_in_timestamp,\n      name,\n      number,\n      avatar_url\n    }\n  }\n"]))),S=Object(O.gql)(c||(c=Object(w.a)(["\n  query{\n    myLendingHistory{\n      id,\n      category,\n      weight,\n      check_out_timestamp,\n      check_in_timestamp,\n      name,\n      number,\n      avatar_url\n    }\n  }\n"]))),_=Object(O.gql)(u||(u=Object(w.a)(["\n  query{\n    myAccount{\n      name,\n      number,\n      email,\n      house,\n      street,\n      city,\n      avatar_url\n    }\n  }\n"]))),C=Object(O.gql)(i||(i=Object(w.a)(["\n  mutation placeHold($id: String!){\n    placeHold(\n      id: $id\n    ) {\n      category\n      weight\n      id\n      transaction_id\n      hold_user_id\n    }\n  }\n"]))),B=Object(O.gql)(o||(o=Object(w.a)(["\n  mutation addNewEquipment($category: String!, $weight: Int!){\n    addEquipment(\n      category: $category,\n      weight: $weight\n    ) {\n      category,\n      weight,\n      id,\n      user_id,\n      transaction_id,\n      hold_user_id\n    }\n  }\n"]))),L=Object(O.gql)(m||(m=Object(w.a)(["\n  mutation removeHold($id: String!){\n    removeHold(\n      id: $id\n    ) {\n      category,\n      weight,\n      id,\n      user_id\n      transaction_id,\n      hold_user_id\n    }\n  }\n"]))),M=function(){var e=Object(d.useState)([]),t=Object(f.a)(e,2),a=t[0],n=t[1],l=Object(d.useState)([]),r=Object(f.a)(l,2),c=r[0],u=r[1],i=Object(d.useState)([]),o=Object(f.a)(i,2),m=o[0],E=o[1],s=Object(O.useQuery)(q,{variables:{type:"available"}}),y=Object(O.useQuery)(q,{variables:{type:"hold"}}),p=Object(O.useQuery)(q,{variables:{type:"checked out"}}),g=Object(O.useMutation)(C,{refetchQueries:[{query:q,variables:{type:"available"}},{query:q,variables:{type:"hold"}}]}),w=Object(f.a)(g,1)[0],k=function(){var e=Object(v.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w({variables:{id:t}});case 2:console.log("Placing a hold on equipment id: ".concat(t));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.useEffect)((function(){s.data&&n(s.data.allOtherEquipment)}),[s.data]),Object(d.useEffect)((function(){y.data&&u(y.data.allOtherEquipment)}),[y.data]),Object(d.useEffect)((function(){p.data&&E(p.data.allOtherEquipment)}),[p.data]),s.loading||y.loading||p.loading?b.a.createElement("div",null,"loading..."):s.error||y.error||p.error?b.a.createElement("div",null,"Error retrieving Marketplace data"):b.a.createElement("div",null,b.a.createElement("h1",null,"Marketplace"),b.a.createElement(j,{label:"Available Equipment",equipment:a,eventHandler:k,buttonLabel:"Place Hold"}),b.a.createElement(j,{label:"Equipment Placed on Hold",equipment:c}),b.a.createElement(j,{label:"Equipment Checked Out",equipment:m}))},N=function(){var e=Object(d.useState)([]),t=Object(f.a)(e,2),a=t[0],n=t[1],l=Object(d.useState)([]),r=Object(f.a)(l,2),c=r[0],u=r[1],i=Object(d.useState)([]),o=Object(f.a)(i,2),m=o[0],E=o[1],s=Object(d.useState)(""),y=Object(f.a)(s,2),p=y[0],g=y[1],w=Object(d.useState)(""),q=Object(f.a)(w,2),H=q[0],S=q[1],_=Object(O.useQuery)(k,{variables:{type:"available"}}),C=Object(O.useQuery)(k,{variables:{type:"hold"}}),M=Object(O.useQuery)(k,{variables:{type:"checked out"}}),N=Object(O.useMutation)(B,{refetchQueries:[{query:k,variables:{type:"available"}}]}),Q=Object(f.a)(N,1)[0],$=function(){var e=Object(v.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,Q({variables:{category:p,weight:parseInt(H)}});case 3:console.log("Creating a new piece of equipment category: ".concat(p," weight: ").concat(H)),g(""),S("");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=Object(O.useMutation)(L,{refetchQueries:[{query:k,variables:{type:"available"}},{query:k,variables:{type:"hold"}}]});Object(f.a)(x,1)[0];return Object(d.useEffect)((function(){_.data&&n(_.data.myEquipment)}),[_.data]),Object(d.useEffect)((function(){C.data&&u(C.data.myEquipment)}),[C.data]),Object(d.useEffect)((function(){M.data&&E(M.data.myEquipment)}),[M.data]),_.loading||C.loading||M.loading?b.a.createElement("div",null,"loading..."):_.error||C.error||M.error?b.a.createElement("div",null,"Error retrieving Marketplace data"):b.a.createElement("div",null,b.a.createElement("h1",null,"My Equipment"),b.a.createElement(j,{label:"Available",equipment:a}),b.a.createElement(j,{label:"On Hold",equipment:c}),b.a.createElement(j,{label:"Checked Out",equipment:m}),b.a.createElement("br",null),b.a.createElement("br",null),b.a.createElement("br",null),b.a.createElement("form",{onSubmit:$},b.a.createElement("div",null,"Category",b.a.createElement("input",{value:p,onChange:function(e){var t=e.target;return g(t.value)}})),b.a.createElement("div",null,"Weight",b.a.createElement("input",{value:H,onChange:function(e){var t=e.target;return S(t.value)}})),b.a.createElement("button",{type:"submit"},"Add Equipment")))},Q=a(46),$=function(e){var t=e.transactions,a=e.columnLabel;return b.a.createElement("div",null,b.a.createElement("table",null,b.a.createElement("tbody",null,b.a.createElement("tr",null,b.a.createElement("th",null,"Category"),b.a.createElement("th",null,"Weight"),b.a.createElement("th",null,"Checkout"),b.a.createElement("th",null,"Checkin"),b.a.createElement("th",null,a),b.a.createElement("th",null,"Number")),t.map((function(e){return b.a.createElement("tr",{key:e.id},b.a.createElement("td",null,e.category),b.a.createElement("td",null,e.weight),b.a.createElement("td",null,e.check_out_timestamp),b.a.createElement("td",null,e.check_in_timestamp),b.a.createElement("td",null,e.name),b.a.createElement("td",null,e.number))})))))},x=function(){var e=Object(d.useState)([]),t=Object(f.a)(e,2),a=t[0],n=t[1],l=Object(d.useState)(""),r=Object(f.a)(l,2),c=(r[0],r[1],Object(d.useState)("")),u=Object(f.a)(c,2),i=(u[0],u[1],Object(d.useState)("")),o=Object(f.a)(i,2),m=(o[0],o[1],Object(O.useQuery)(H));Object(d.useEffect)((function(){m.data&&n(m.data.myBorrowingHistory)}),[m.data]);if(m.loading)return b.a.createElement("div",null,"loading...");if(m.error)return b.a.createElement("div",null,"Error retrieving Borrowing History data");var E=new Set;m.data.myBorrowingHistory.map((function(e){return E.add(e.weight)}));var s=Object(Q.a)(E),y=function(e){var t=m.data.myBorrowingHistory.filter((function(t){return t.weight===e}));n(t)},p=new Set;m.data.myBorrowingHistory.map((function(e){return p.add(e.category)}));var g=Object(Q.a)(p),h=new Set;m.data.myBorrowingHistory.map((function(e){return h.add(e.name)}));var v=Object(Q.a)(h);return b.a.createElement("div",null,b.a.createElement("h1",null,"My Borrowing History"),b.a.createElement("h2",null,"Breakdown of Your Borrowing"),b.a.createElement("span",null,b.a.createElement("b",null,"Weights: ")),s.map((function(e){return b.a.createElement("button",{key:e,type:"button",onClick:function(){return y(e)}},e," lb")})),b.a.createElement("br",null),b.a.createElement("span",null,b.a.createElement("b",null,"Categories: ")),g.map((function(e){return b.a.createElement("button",{key:e,type:"button",onClick:function(){return y(e)}},e)})),b.a.createElement("br",null),b.a.createElement("span",null,b.a.createElement("b",null,"Lenders: ")),v.map((function(e){return b.a.createElement("button",{key:e,type:"button",onClick:function(){return function(e){var t=m.data.myBorrowingHistory.filter((function(t){return t.name===e}));n(t)}(e)}},e)})),b.a.createElement("br",null),b.a.createElement("br",null),b.a.createElement("button",{type:"button",onClick:function(){n(m.data.myBorrowingHistory)}},"Reset Filters"),b.a.createElement("br",null),b.a.createElement("br",null),b.a.createElement("br",null),b.a.createElement("h2",null,"Ledger of Transactions"),b.a.createElement($,{transactions:a,columnLabel:"Lender"}))},A=function(){var e=Object(d.useState)([]),t=Object(f.a)(e,2),a=t[0],n=t[1],l=Object(O.useQuery)(S);return Object(d.useEffect)((function(){l.data&&n(l.data.myLendingHistory)}),[l.data]),l.loading?b.a.createElement("div",null,"loading..."):l.error?b.a.createElement("div",null,"Error retrieving Lending History data"):b.a.createElement("div",null,b.a.createElement("h1",null,"My Lending History"),b.a.createElement($,{transactions:a,columnLabel:"Borrower"}))},W=function(){var e=Object(d.useState)([]),t=Object(f.a)(e,2),a=(t[0],t[1]),n=Object(O.useQuery)(_);return Object(d.useEffect)((function(){n.data&&a(n.data.myAccount)}),[n.data]),n.loading?b.a.createElement("div",null,"loading..."):n.error?b.a.createElement("div",null,"Error retrieving Dashboard data"):b.a.createElement("div",null,b.a.createElement("h1",null,"Dashboard"),b.a.createElement("p",null,b.a.createElement("b",null,"Name:")," Brock Harrison"),b.a.createElement("p",null,b.a.createElement("b",null,"Number:")," 647-787-4515"),b.a.createElement("p",null,b.a.createElement("b",null,"Email:")," Brock@Kanto.com"),b.a.createElement("p",null,b.a.createElement("b",null,"House:")," 14"),b.a.createElement("p",null,b.a.createElement("b",null,"Street:")," Route 5"),b.a.createElement("p",null,b.a.createElement("b",null,"City:")," Pewter City"))};a(85);var P=function(){return b.a.createElement("div",null,b.a.createElement(y.a,null,b.a.createElement("div",{className:"sidebar"},b.a.createElement(y.b,{to:"/"},b.a.createElement("h1",{className:"logo"},"GYM SHARE")),b.a.createElement(y.b,{to:"/marketplace",className:"link nav-select",activeStyle:{fontWeight:"bold",color:"white"}},"Marketplace"),b.a.createElement(y.b,{to:"/equipment",className:"link nav-select",activeStyle:{fontWeight:"bold",color:"white"}},"My Equipment"),b.a.createElement(y.b,{to:"/borrowingHistory",className:"link nav-select",activeStyle:{fontWeight:"bold",color:"white"}},"Borrowing History"),b.a.createElement(y.b,{to:"/lendingHistory",className:"link nav-select",activeStyle:{fontWeight:"bold",color:"white"}},"Lending History"),b.a.createElement("button",{className:"logout-button"},"Logout")),b.a.createElement("div",{className:"main"},b.a.createElement(p.c,null,b.a.createElement(p.a,{exact:!0,path:"/"},b.a.createElement(W,null)),b.a.createElement(p.a,{exact:!0,path:"/marketplace"},b.a.createElement(M,null)),b.a.createElement(p.a,{exact:!0,path:"/equipment"},b.a.createElement(N,null)),b.a.createElement(p.a,{exact:!0,path:"/borrowingHistory"},b.a.createElement(x,null)),b.a.createElement(p.a,{exact:!0,path:"/lendingHistory"},b.a.createElement(A,null))))))},I=new O.ApolloClient({cache:new O.InMemoryCache,link:new O.HttpLink({uri:"http://localhost:3006/graphql"})});s.a.render(b.a.createElement(O.ApolloProvider,{client:I},b.a.createElement(P,null)),document.getElementById("root"))}},[[73,1,2]]]);
//# sourceMappingURL=main.b8bb31b0.chunk.js.map