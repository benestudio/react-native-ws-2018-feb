On my machine:


```
Scores: (bigger is better)

very-fast-args
Raw:
 > 35773.22677322677
 > 34903.096903096906
 > 33770.22977022977
 > 30396.603396603397
Average (mean) 33710.78921078921

Array.apply
Raw:
 > 31111.88811188811
 > 28360.63936063936
 > 26026.973026973028
 > 28310.68931068931
Average (mean) 28452.547452547453

fast-args
Raw:
 > 17877.122877122878
 > 16796.203796203798
 > 17300.6993006993
 > 16750.24975024975
Average (mean) 17181.068931068934

Array.slice.call
Raw:
 > 6111.888111888112
 > 6124.875124875125
 > 5700.2997002997
 > 5562.4375624375625
Average (mean) 5874.875124875125

Winner: very-fast-args
Compared with next highest (Array.apply), it's:
15.6% faster
1.18 times as fast
0.07 order(s) of magnitude faster
A LITTLE FASTER

Compared with the slowest (Array.slice.call), it's:
82.57% faster
5.74 times as fast
0.76 order(s) of magnitude faster
```
