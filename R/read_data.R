
library(dplyr)
library(rjson)

df.test <- read.csv('../data/bnz_shape.csv')

# Remove test rows
data <- df.test[9:nrow(df.test),]

# Convert json to df
inv_fromJson<-function(js) {
  js <- chartr("\\\\", "''", js)
  js <- gsub("'", '"', js)
  fromJSON(js)
}


# Subject data
df.sw <- data.frame(inv_fromJson(data[1,'subject']))
for (i in seq(2,nrow(data))) {
  df.sw <- rbind(df.sw, data.frame(inv_fromJson(data[i,'subject'])))
}
df.sw$id = data$id

# Trial data
df.tw <- read.csv(text='id,task,order,action')
for (i in 1:nrow(df.test)) {
  tdata <- inv_fromJson(data[i,'trial'])
  sid <- data[i, 'id']
  
  for (j in 1:length(tdata)) {
    tselections <- data.frame(id=sid, task=j, order=seq(length(tdata[[j]])), action=tdata[[j]])
    df.tw <- rbind(df.tw, tselections)
  }
}
exp_conds = df.sw %>% select(id, condition)
df.tw <- df.tw %>% left_join(exp_conds, by='id') %>%
  select(condition, id, task, order, action)


# Merge data for readability
df.ts = df.tw %>%
  mutate(button=case_when(action == 'dax' ~ 'U',
                          action == 'wip' ~ 'S',
                          action == 'zif' ~ 'L',
                          action == 'kiki' ~ 'R')) %>%
  group_by(condition, id, task) %>%
  summarise(sequ=paste0(button, collapse = '')) %>%
  arrange(id, task)

save(df.sw, df.tw, df.ts, file='../data/pilot_0416.Rda')


# Pull states data
for (i in seq(9,24)) {
  write(toJSON(inv_fromJson(df.test[i,'extra'])), paste0('../data/pilot_0416/ind/ppt_',i,'.json'))
}






