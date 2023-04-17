
library(dplyr)

load('../data/pilot_0416.Rda')

# Number of people in each condition
df.sw %>% count(condition)


# Manual check
df.ts.wide = df.ts %>%
  filter(!(id==25)) %>%
  pivot_wider(names_from = task, values_from = sequ) %>%
  arrange(desc(condition), id)

# Reduce rotations










#### Archive ####
view_data <- function(tid=0, sid=0, data=df.tw) {
  if (sid > 0 && tid > 0) {
    x = data %>% filter(id==sid, task==tid)
  } 
  if (sid == 0 && tid > 0) {
    x = data %>%
      filter(task==tid) %>%
      group_by(condition, task) %>%
      count(action) %>%
      arrange(condition, desc(n))
  }
  if (sid > 0 && tid == 0) {
    x = data %>% filter(id==sid)
  }

  View(x)
}

df.sw %>% filter(condition=='unit') %>% pull(id) # 9 10 11 12 13 19
df.sw %>% filter(condition=='stick') %>% pull(id) # 16 17 18 22 23 24 25(no data)
df.sw %>% filter(condition=='corner') %>% pull(id) # 14 15 20 21

view_data(sid=9)

















