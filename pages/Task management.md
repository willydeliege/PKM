- DONE test now
  :LOGBOOK:
  CLOCK: [2024-11-14 Thu 18:02:32]
  CLOCK: [2024-11-14 Thu 18:02:35]--[2024-11-15 Fri 07:18:36] =>  13:16:01
  :END:
- DONE test later
  :LOGBOOK:
  CLOCK: [2024-11-14 Thu 18:03:20]
  :END:
- # Template
  template:: task-management
  template-including-parent:: false
	- ## Tasks
		- #+BEGIN_QUERY
		    {:title "🔨 NOW"
		      :query [:find (pull ?h [*])
		              :in $ ?start ?today
		              :where
		              [?h :block/marker ?marker]
		              [(contains? #{"NOW" "DOING"} ?marker)]
		              [?h :block/page ?p]
		              [?p :block/journal? true]
		              [?p :block/journal-day ?d]
		              [(>= ?d ?start)]
		              [(<= ?d ?today)]]
		      :inputs [:14d :today]
		      :group-by-page? true
		      :collapsed? false}
		  
		  #+END_QUERY
		- #+BEGIN_QUERY
		     {:title "📅 NEXT"
		      :query [:find (pull ?h [*])
		              :in $ ?start ?next
		              :where
		              [?h :block/marker ?marker]
		              [(contains? #{"NOW" "LATER" "TODO"} ?marker)]
		              [?h :block/page ?p]
		              [?p :block/journal? true]
		              [?p :block/journal-day ?d]
		              [(> ?d ?start)]
		              [(< ?d ?next)]]
		      :inputs [:today :7d-after]
		      :group-by-page? true
		      :collapsed? false}
		  
		  #+END_QUERY
		- #+BEGIN_QUERY
		     {:title "🟠 SLIPPING"
		    :query [:find (pull ?b [*])
		            :in $ ?start ?today
		            :where
		            (task ?b #{"NOW" "LATER" "TODO" "DOING"})
		            (between ?b ?start ?today)]
		    :inputs [:-7d :yesterday]
		    :collapsed? false}
		  #+END_QUERY
-
- Vol-au-vent
	- ```calc
	  8.33*8/10
	  ```