# personal

```json
{
    "module": [
        {"primary_key": [
            "python_type",
            "sql_type",
            "column_parameters",
            "[sample value]"
        ]},
        {"attr1": [
            "python_type",
            "sql_type",
            "column_parameters",
            "[sample value]"
        ]},
        {"attr2": ["..."]}
    ],
    // For example:
    "users": [ // (Make it plural)
        {"id": [
            "UUID",
            "UUID",
            "DEFAULT gen_random_uuid()"
        ]},
        {"username": [
            "str",
            "VARCHAR(40)",
            "",
            "John Doe"
        ]}
    ]
}
```