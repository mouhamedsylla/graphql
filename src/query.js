export default {
    USER_INFO: 
    `query {
        user {
            id
            login
            firstName
            lastName
            email
            campus
            auditRatio
        }
    }`,

    USER_XP:
    `query {
        user {
            transactions_aggregate(where: {
                                    event : { path: { _eq: "/dakar/div-01" } } 
                                        _and: { type: { _eq: "xp" } } }
            ) {
            	aggregate {
                sum {
                  amount
                }
              }
            }
        }
    }
    `,

    USER_TRANSACTIONS:
    `query {
        user {
            transactions(where: {
                type: {
                    _eq: "xp"
                } _and: {
                    path: {
                        _iregex: "div-01/(?!.*\/).*$"
                    }    
                } 
            }) {
                path
                amount
            }
        }
    }
    `,

    TECHNOLOGIES_SKILLS:
    `query {
        transaction(where: {type: {_iregex: "skill_*"}} 
    					distinct_on: type
    					order_by: [{type: asc}, {amount: desc}]
        ) {
            amount
            type
        }
    }`
}

/*
query {
	transaction_aggregate(where: { path: { _iregex: "/dakar/div-01/(?!.*\/).*$"} _and: {type: {_eq: "xp"}}}) {
    aggregate {
      sum {
        amount
      }
    }
  }       
}

*/ 