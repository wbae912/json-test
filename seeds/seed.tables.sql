BEGIN;

TRUNCATE
  lists;

INSERT INTO lists (title, items)
VALUES
  (
    'List 1', 
    '[{"name": "Bag", "checked": false}, {"name": "Paper", "checked": false}, {"name": "Pen", "checked": false}]'
  ),
  (
    'List 2', 
    '[{"name": "Laptop", "checked": false}, {"name": "Keys", "checked": false}, {"name": "Wallet", "checked": false}]'
  );

COMMIT;